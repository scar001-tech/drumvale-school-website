// ─────────────────────────────────────────────────────────────────────────────
// Drumvale School System — Database Service
// Persistence: localStorage  (key: "drumvale_db")
// All reads/writes go through this module.
// ─────────────────────────────────────────────────────────────────────────────

import type {
    DrumvaleDB, Application, Student, Staff,
    SmsLog, FeeRecord, ApplicationStatus,
} from "./schema";
import { DB_VERSION } from "./schema";
import { buildInitialDB } from "./seed";

const STORAGE_KEY = "drumvale_db";

// ── Low-level persistence ─────────────────────────────────────────────────────

function load(): DrumvaleDB {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return buildInitialDB();
        const parsed = JSON.parse(raw) as DrumvaleDB;
        // Migrate if version mismatch
        if (!parsed.meta || parsed.meta.version !== DB_VERSION) {
            const fresh = buildInitialDB();
            // Preserve existing data, merge staff seed
            return { ...fresh, ...parsed, meta: { ...fresh.meta, ...parsed.meta, version: DB_VERSION } };
        }
        return parsed;
    } catch {
        return buildInitialDB();
    }
}

function save(db: DrumvaleDB): void {
    db.meta.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

// ── Singleton in-memory copy ──────────────────────────────────────────────────

let _db: DrumvaleDB = load();

/** Force reload from localStorage (useful after external writes) */
export function reloadDB(): void {
    _db = load();
}

/** Export a full snapshot (for debugging / backup) */
export function exportDB(): string {
    return JSON.stringify(_db, null, 2);
}

/** Wipe and re-seed (dev/admin use only) */
export function resetDB(): void {
    _db = buildInitialDB();
    save(_db);
}

// ─────────────────────────────────────────────────────────────────────────────
// Applications
// ─────────────────────────────────────────────────────────────────────────────

export const Applications = {
    getAll(): Application[] {
        return Object.values(_db.applications);
    },

    getById(id: string): Application | undefined {
        return _db.applications[id];
    },

    getByStatus(status: ApplicationStatus): Application[] {
        return Object.values(_db.applications).filter((a) => a.status === status);
    },

    create(data: Omit<Application, "id" | "status" | "submittedAt" | "feesPaid">): Application {
        const id = `APP${Date.now()}`;
        const app: Application = {
            ...data,
            id,
            status: "submitted",
            submittedAt: new Date().toISOString().split("T")[0],
            feesPaid: false,
        };
        _db.applications[id] = app;
        save(_db);
        return app;
    },

    update(id: string, patch: Partial<Application>): Application | null {
        const existing = _db.applications[id];
        if (!existing) return null;
        _db.applications[id] = { ...existing, ...patch };
        save(_db);
        return _db.applications[id];
    },

    approve(id: string): Application | null {
        return Applications.update(id, {
            status: "approved",
            approvedAt: new Date().toISOString().split("T")[0],
        });
    },

    reject(id: string, reason?: string): Application | null {
        return Applications.update(id, {
            status: "rejected",
            rejectedAt: new Date().toISOString().split("T")[0],
            rejectionReason: reason,
        });
    },

    recordPayment(id: string, amount: number): Application | null {
        const receiptNumber = `RCP${Date.now()}`;
        const fee: FeeRecord = {
            id: `FEE${Date.now()}`,
            applicationId: id,
            studentName: (() => {
                const a = _db.applications[id];
                return a ? `${a.studentFirstName} ${a.studentLastName}` : "Unknown";
            })(),
            amount,
            currency: "USD",
            paidAt: new Date().toISOString(),
            method: "online",
            receiptNumber,
        };
        _db.feeRecords[fee.id] = fee;
        return Applications.update(id, {
            status: "assessment",
            feesPaid: true,
            feesPaidAt: new Date().toISOString().split("T")[0],
            feesAmount: amount,
        });
    },

    recordAssessment(id: string, score: number): Application | null {
        const passed = score >= 60;
        return Applications.update(id, {
            status: passed ? "interview" : "rejected",
            assessmentScore: score,
            assessmentCompletedAt: new Date().toISOString().split("T")[0],
            ...(passed ? {} : { rejectedAt: new Date().toISOString().split("T")[0], rejectionReason: "Did not meet assessment score requirement" }),
        });
    },

    recordInterview(id: string, passed: boolean): Application | null {
        if (!passed) {
            return Applications.update(id, {
                interviewPassed: false,
                interviewCompletedAt: new Date().toISOString().split("T")[0],
                status: "rejected",
                rejectedAt: new Date().toISOString().split("T")[0],
                rejectionReason: "Did not pass interview",
            });
        }
        // Enroll the student
        const app = _db.applications[id];
        if (!app) return null;
        const admissionNumber = Students.generateAdmissionNumber();
        const student: Student = {
            admissionNumber,
            applicationId: id,
            firstName: app.studentFirstName,
            lastName: app.studentLastName,
            dob: app.studentDOB,
            gender: app.studentGender,
            nationality: app.studentNationality,
            grade: app.gradeApplying,
            enrolledAt: new Date().toISOString().split("T")[0],
            guardianName: app.parentName,
            guardianPhone: app.parentPhone,
            guardianEmail: app.parentEmail,
            assessmentScore: app.assessmentScore ?? 0,
            active: true,
        };
        _db.students[admissionNumber] = student;
        return Applications.update(id, {
            status: "enrolled",
            interviewPassed: true,
            interviewCompletedAt: new Date().toISOString().split("T")[0],
            enrolledAt: new Date().toISOString().split("T")[0],
            admissionNumber,
        });
    },

    delete(id: string): boolean {
        if (!_db.applications[id]) return false;
        delete _db.applications[id];
        save(_db);
        return true;
    },

    count(): number {
        return Object.keys(_db.applications).length;
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Students
// ─────────────────────────────────────────────────────────────────────────────

export const Students = {
    getAll(): Student[] {
        return Object.values(_db.students);
    },

    getByAdmissionNumber(admissionNumber: string): Student | undefined {
        return _db.students[admissionNumber];
    },

    getByGrade(grade: string): Student[] {
        return Object.values(_db.students).filter((s) => s.grade === grade);
    },

    generateAdmissionNumber(): string {
        const year = new Date().getFullYear().toString().slice(-2);
        const seq = String(_db.meta.nextAdmissionSeq).padStart(4, "0");
        _db.meta.nextAdmissionSeq += 1;
        save(_db);
        return `DSS${year}${seq}`;
    },

    update(admissionNumber: string, patch: Partial<Student>): Student | null {
        const existing = _db.students[admissionNumber];
        if (!existing) return null;
        _db.students[admissionNumber] = { ...existing, ...patch };
        save(_db);
        return _db.students[admissionNumber];
    },

    deactivate(admissionNumber: string): Student | null {
        return Students.update(admissionNumber, { active: false });
    },

    count(): number {
        return Object.keys(_db.students).length;
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Staff
// ─────────────────────────────────────────────────────────────────────────────

export const StaffDB = {
    getAll(): Staff[] {
        return Object.values(_db.staff);
    },

    getById(id: string): Staff | undefined {
        return _db.staff[id];
    },

    authenticate(email: string, password: string): Staff | null {
        const found = Object.values(_db.staff).find(
            (s) => s.email.toLowerCase() === email.toLowerCase() &&
                   s.passwordHash === password &&
                   s.active
        );
        return found ?? null;
    },

    create(data: Omit<Staff, "id">): Staff {
        const id = `STF${String(Object.keys(_db.staff).length + 1).padStart(3, "0")}`;
        const staff: Staff = { ...data, id };
        _db.staff[id] = staff;
        save(_db);
        return staff;
    },

    update(id: string, patch: Partial<Staff>): Staff | null {
        const existing = _db.staff[id];
        if (!existing) return null;
        _db.staff[id] = { ...existing, ...patch };
        save(_db);
        return _db.staff[id];
    },

    count(): number {
        return Object.keys(_db.staff).length;
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// SMS Logs
// ─────────────────────────────────────────────────────────────────────────────

export const SmsLogs = {
    getAll(): SmsLog[] {
        return Object.values(_db.smsLogs).sort((a, b) =>
            new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        );
    },

    log(entry: Omit<SmsLog, "id" | "sentAt">): SmsLog {
        const id = `SMS${Date.now()}`;
        const log: SmsLog = { ...entry, id, sentAt: new Date().toISOString() };
        _db.smsLogs[id] = log;
        save(_db);
        return log;
    },

    getByApplication(applicationId: string): SmsLog[] {
        return Object.values(_db.smsLogs).filter(
            (s) => s.relatedApplicationId === applicationId
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Fee Records
// ─────────────────────────────────────────────────────────────────────────────

export const FeeRecords = {
    getAll(): FeeRecord[] {
        return Object.values(_db.feeRecords);
    },

    getByApplication(applicationId: string): FeeRecord[] {
        return Object.values(_db.feeRecords).filter(
            (f) => f.applicationId === applicationId
        );
    },

    totalCollected(): number {
        return Object.values(_db.feeRecords).reduce((sum, f) => sum + f.amount, 0);
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard Stats
// ─────────────────────────────────────────────────────────────────────────────

export const Stats = {
    summary() {
        const apps = Applications.getAll();
        return {
            totalApplications: apps.length,
            pending:   apps.filter((a) => a.status === "submitted").length,
            approved:  apps.filter((a) => a.status === "approved").length,
            rejected:  apps.filter((a) => a.status === "rejected").length,
            inAssessment: apps.filter((a) => a.status === "assessment").length,
            inInterview:  apps.filter((a) => a.status === "interview").length,
            enrolled:  apps.filter((a) => a.status === "enrolled").length,
            totalStudents: Students.count(),
            totalStaff:    StaffDB.count(),
            totalFeesCollected: FeeRecords.totalCollected(),
            smsSent: SmsLogs.getAll().length,
        };
    },
};
