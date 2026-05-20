// ─────────────────────────────────────────────────────────────────────────────
// Drumvale School System — Database Schema
// ─────────────────────────────────────────────────────────────────────────────
// Persistence: localStorage (browser-native, no server required)
// All collections are typed and versioned.
// ─────────────────────────────────────────────────────────────────────────────

export const DB_VERSION = 1;

// ── Enums ─────────────────────────────────────────────────────────────────────

export type ApplicationStatus =
    | "submitted"
    | "approved"
    | "rejected"
    | "assessment"
    | "interview"
    | "enrolled";

export type Gender = "Male" | "Female" | "Other";
export type Relationship = "Mother" | "Father" | "Guardian" | "Other";
export type Grade = "Grade 10" | "Form 3" | "Form 4";

// ── Document record ───────────────────────────────────────────────────────────

export interface StoredFile {
    name: string;
    type: string;       // MIME type
    dataUrl: string;    // base64 data URL
    uploadedAt: string; // ISO date
}

// ── Applications table ────────────────────────────────────────────────────────

export interface Application {
    id: string;                         // PK  e.g. "APP1720000000000"
    // Student
    studentFirstName: string;
    studentLastName: string;
    studentDOB: string;                 // ISO date
    studentGender: Gender;
    studentNationality: string;
    gradeApplying: Grade;
    // Parent / Guardian
    parentName: string;
    parentIdNumber: string;
    parentEmail: string;
    parentPhone: string;
    parentRelationship: Relationship;
    // Documents (stored as base64)
    transcriptFile?: StoredFile;
    birthCertFile?: StoredFile;
    parentIdFile?: StoredFile;
    // Workflow
    status: ApplicationStatus;
    submittedAt: string;                // ISO date
    approvedAt?: string;
    rejectedAt?: string;
    enrolledAt?: string;
    rejectionReason?: string;
    // Assessment
    assessmentScore?: number;
    assessmentCompletedAt?: string;
    interviewPassed?: boolean;
    interviewCompletedAt?: string;
    // Fees
    feesPaid: boolean;
    feesPaidAt?: string;
    feesAmount?: number;
    // Enrollment
    admissionNumber?: string;           // FK → Students.admissionNumber
}

// ── Students table (enrolled only) ───────────────────────────────────────────

export interface Student {
    admissionNumber: string;            // PK  e.g. "DSS240001"
    applicationId: string;              // FK → Applications.id
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    nationality: string;
    grade: Grade;
    enrolledAt: string;
    // Guardian
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
    // Academic
    assessmentScore: number;
    active: boolean;
}

// ── Staff table ───────────────────────────────────────────────────────────────

export interface TimetableEntry {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    period: string;
    time: string;
    subject: string;
    class: string;
    room: string;
}

export interface Staff {
    id: string;                         // PK  e.g. "STF001"
    name: string;
    email: string;
    passwordHash: string;               // plain text for demo; hash in production
    role: string;
    department: string;
    phone: string;
    subjects: string[];
    timetable: TimetableEntry[];
    joinDate: string;
    active: boolean;
}

// ── SMS Log table ─────────────────────────────────────────────────────────────

export interface SmsLog {
    id: string;                         // PK  e.g. "SMS1720000000000"
    to: string;
    message: string;
    sentAt: string;
    status: "sent" | "failed" | "demo";
    relatedApplicationId?: string;
}

// ── Fees table ────────────────────────────────────────────────────────────────

export interface FeeRecord {
    id: string;                         // PK
    applicationId: string;              // FK
    studentName: string;
    amount: number;
    currency: string;
    paidAt: string;
    method: "online" | "bank_transfer" | "cash";
    receiptNumber: string;
}

// ── Database shape ────────────────────────────────────────────────────────────

export interface DrumvaleDB {
    applications: Record<string, Application>;
    students: Record<string, Student>;
    staff: Record<string, Staff>;
    smsLogs: Record<string, SmsLog>;
    feeRecords: Record<string, FeeRecord>;
    meta: {
        version: number;
        createdAt: string;
        lastUpdated: string;
        nextAdmissionSeq: number;
    };
}
