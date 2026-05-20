// ─────────────────────────────────────────────────────────────────────────────
// Portal Context — connects UI to the Drumvale database layer
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
    Applications, Students, StaffDB, SmsLogs, Stats,
    reloadDB,
} from "@/db/database";
import type {
    Application, Student, Staff, SmsLog, ApplicationStatus,
} from "@/db/schema";

// Re-export types the UI needs
export type { Application, Student, Staff, SmsLog, ApplicationStatus };
export type { StoredFile as UploadedFile } from "@/db/schema";

// ── SMS sender (Vonage) ───────────────────────────────────────────────────────

export const sendSMS = async (
    to: string,
    message: string,
    applicationId?: string
): Promise<boolean> => {
    const phone = to.startsWith("+") ? to : `+${to}`;
    const apiKey = import.meta.env.VITE_VONAGE_API_KEY as string | undefined;
    const apiSecret = import.meta.env.VITE_VONAGE_API_SECRET || "C1cC9Rg3vYUGQLjW";
    const fromNumber = (import.meta.env.VITE_VONAGE_FROM_NUMBER as string) || "DRUMVALE";

    let status: "sent" | "failed" | "demo" = "demo";

    if (apiKey && apiSecret) {
        try {
            // Vonage SMS API endpoint
            const response = await fetch("https://rest.nexmo.com/sms/json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    api_key: apiKey,
                    api_secret: apiSecret,
                    to: phone.replace(/[^0-9+]/g, ""), // Clean phone number
                    from: fromNumber,
                    text: message,
                }),
            });

            const data = await response.json();
            
            // Vonage returns status "0" for success
            if (data.messages && data.messages[0].status === "0") {
                status = "sent";
                console.log(`[SMS SENT via Vonage] To: ${phone} | Message ID: ${data.messages[0]["message-id"]}`);
            } else {
                status = "failed";
                const errorText = data.messages?.[0]?.["error-text"] || "Unknown error";
                console.error(`[SMS FAILED] ${errorText}`);
            }
        } catch (error) {
            status = "failed";
            console.error("[SMS ERROR]", error);
        }
    } else {
        console.log(`[SMS DEMO MODE] To: ${phone}\n${message}`);
    }

    SmsLogs.log({ to: phone, message, status, relatedApplicationId: applicationId });
    return status !== "failed";
};

// ── Context type ──────────────────────────────────────────────────────────────

interface PortalContextType {
    // Staff auth
    staffUser: Staff | null;
    staffLogin: (email: string, password: string) => boolean;
    staffLogout: () => void;
    updateStaffCredentials: (id: string, patch: { name?: string; email?: string; phone?: string; passwordHash?: string }) => boolean;
    // Applications (reactive — triggers re-render)
    applications: Application[];
    refreshApplications: () => void;
    submitApplication: (data: Omit<Application, "id" | "status" | "submittedAt" | "feesPaid">) => Promise<string>;
    getApplication: (id: string) => Application | undefined;
    approveApplication: (id: string) => Promise<void>;
    rejectApplication: (id: string, reason?: string) => Promise<void>;
    recordPayment: (id: string, amount: number) => Promise<void>;
    recordAssessment: (id: string, score: number) => void;
    recordInterview: (id: string, passed: boolean) => Promise<void>;
    // Students
    students: Student[];
    // SMS logs
    smsLogs: SmsLog[];
    // Stats
    stats: ReturnType<typeof Stats.summary>;
}

const PortalContext = createContext<PortalContextType | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export const PortalProvider = ({ children }: { children: ReactNode }) => {
    const [staffUser, setStaffUser] = useState<Staff | null>(null);
    // Reactive snapshots — re-read from DB on every mutation
    const [applications, setApplications] = useState<Application[]>(() => Applications.getAll());
    const [students, setStudents] = useState<Student[]>(() => Students.getAll());
    const [smsLogs, setSmsLogs] = useState<SmsLog[]>(() => SmsLogs.getAll());
    const [stats, setStats] = useState(() => Stats.summary());

    const refresh = useCallback(() => {
        reloadDB();
        setApplications(Applications.getAll());
        setStudents(Students.getAll());
        setSmsLogs(SmsLogs.getAll());
        setStats(Stats.summary());
    }, []);

    // ── Staff auth ────────────────────────────────────────────────────────────

    const staffLogin = (email: string, password: string): boolean => {
        const found = StaffDB.authenticate(email, password);
        if (found) { setStaffUser(found); return true; }
        return false;
    };

    const staffLogout = () => setStaffUser(null);

    const updateStaffCredentials = (
        id: string,
        patch: { name?: string; email?: string; phone?: string; passwordHash?: string }
    ): boolean => {
        const updated = StaffDB.update(id, patch);
        if (!updated) return false;
        setStaffUser(updated); // keep session in sync
        return true;
    };

    // ── Applications ──────────────────────────────────────────────────────────

    const submitApplication = async (
        data: Omit<Application, "id" | "status" | "submittedAt" | "feesPaid">
    ): Promise<string> => {
        const app = Applications.create(data);
        refresh();

        const msg =
            `Dear ${app.parentName}, your application for ${app.studentFirstName} ${app.studentLastName} ` +
            `(${app.gradeApplying}) at Drumvale Secondary School has been received. ` +
            `Application ID: ${app.id}. Status: PENDING APPROVAL. ` +
            `We will notify you once a decision is made. - Drumvale Admissions`;
        await sendSMS(app.parentPhone, msg, app.id);
        refresh();
        return app.id;
    };

    const getApplication = (id: string) => Applications.getById(id);

    const approveApplication = async (id: string): Promise<void> => {
        const app = Applications.approve(id);
        refresh();
        if (!app) return;
        const msg =
            `Dear ${app.parentName}, GREAT NEWS! The application for ` +
            `${app.studentFirstName} ${app.studentLastName} (${app.gradeApplying}) ` +
            `at Drumvale Secondary School has been APPROVED. ` +
            `Please log in to the Parent Portal to pay fees and proceed with enrollment. ` +
            `Application ID: ${id}. - Drumvale Admissions`;
        await sendSMS(app.parentPhone, msg, id);
        refresh();
    };

    const rejectApplication = async (id: string, reason?: string): Promise<void> => {
        const app = Applications.reject(id, reason);
        refresh();
        if (!app) return;
        const msg =
            `Dear ${app.parentName}, we regret to inform you that the application for ` +
            `${app.studentFirstName} ${app.studentLastName} (${app.gradeApplying}) ` +
            `at Drumvale Secondary School has not been successful. ` +
            `${reason ? `Reason: ${reason}. ` : ""}` +
            `Please contact admissions@drumvale.edu for guidance. ` +
            `Application ID: ${id}. - Drumvale Admissions`;
        await sendSMS(app.parentPhone, msg, id);
        refresh();
    };

    const recordPayment = async (id: string, amount: number) => {
        const app = Applications.getById(id);
        Applications.recordPayment(id, amount);
        refresh();
        if (!app) return;
        const msg =
            `Payment of $${amount.toLocaleString()} received for ${app.studentFirstName} ${app.studentLastName}. ` +
            `Your child can now access the Student Portal for assessment and interview. ` +
            `Application ID: ${id}. - Drumvale School`;
        await sendSMS(app.parentPhone, msg, id);
        refresh();
    };

    const recordAssessment = (id: string, score: number) => {
        Applications.recordAssessment(id, score);
        refresh();
    };

    const recordInterview = async (id: string, passed: boolean) => {
        const appBefore = Applications.getById(id);
        Applications.recordInterview(id, passed);
        refresh();
        
        // Send SMS notification
        if (appBefore && passed) {
            const appAfter = Applications.getById(id);
            if (appAfter && appAfter.status === "enrolled" && appAfter.admissionNumber) {
                const msg =
                    `Congratulations! ${appAfter.studentFirstName} ${appAfter.studentLastName} ` +
                    `is now enrolled at Drumvale Secondary School. ` +
                    `Admission Number: ${appAfter.admissionNumber}. ` +
                    `Welcome to our community! - Drumvale School`;
                await sendSMS(appAfter.parentPhone, msg, id);
                refresh();
            }
        }
    };

    return (
        <PortalContext.Provider value={{
            staffUser, staffLogin, staffLogout, updateStaffCredentials,
            applications, refreshApplications: refresh,
            submitApplication, getApplication,
            approveApplication, rejectApplication,
            recordPayment, recordAssessment, recordInterview,
            students, smsLogs, stats,
        }}>
            {children}
        </PortalContext.Provider>
    );
};

export const usePortal = () => {
    const ctx = useContext(PortalContext);
    if (!ctx) throw new Error("usePortal must be used within PortalProvider");
    return ctx;
};

// Keep MOCK_STAFF export for StaffPortal demo credentials display
export { SEED_STAFF as MOCK_STAFF } from "@/db/seed";
