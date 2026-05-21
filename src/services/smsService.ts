// ─────────────────────────────────────────────────────────────────────────────
// SMS Service — Vonage Integration
// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: In production, SMS sending should be done server-side to protect
// API credentials. This implementation is for demonstration purposes.
// ─────────────────────────────────────────────────────────────────────────────

import type { SmsLog } from "@/db/schema";

// SMS Configuration
const VONAGE_API_SECRET = import.meta.env.VITE_VONAGE_API_SECRET || "C1cC9Rg3vYUGQLjW";
const VONAGE_API_KEY = import.meta.env.VITE_VONAGE_API_KEY || "";
const FROM_NUMBER = import.meta.env.VITE_VONAGE_FROM_NUMBER || "DRUMVALE";

// Demo mode flag - automatically disabled when API key is present
const DEMO_MODE = !VONAGE_API_KEY;

export interface SendSmsParams {
    to: string;
    message: string;
    relatedApplicationId?: string;
}

export interface SendSmsResult {
    success: boolean;
    messageId?: string;
    error?: string;
    log: SmsLog;
}

/**
 * Send SMS via Vonage API
 * In demo mode, this simulates sending without making actual API calls
 */
export async function sendSms(params: SendSmsParams): Promise<SendSmsResult> {
    const { to, message, relatedApplicationId } = params;

    // Create log entry
    const log: SmsLog = {
        id: `SMS${Date.now()}`,
        to: to,
        message: message,
        sentAt: new Date().toISOString(),
        status: "demo",
        relatedApplicationId,
    };

    // Demo mode - simulate sending
    if (DEMO_MODE) {
        console.log("📱 SMS (DEMO MODE):");
        console.log(`   To: ${to}`);
        console.log(`   Message: ${message}`);
        console.log(`   Application ID: ${relatedApplicationId || "N/A"}`);
        
        // Store in localStorage for tracking
        storeSmsLog(log);
        
        return {
            success: true,
            messageId: log.id,
            log: { ...log, status: "demo" },
        };
    }

    // Production mode - actual Vonage API call
    try {
        // Note: Vonage REST API endpoint
        // In a real implementation, this should be proxied through your backend
        const response = await fetch("https://rest.nexmo.com/sms/json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: VONAGE_API_KEY,
                api_secret: VONAGE_API_SECRET,
                to: to.replace(/[^0-9+]/g, ""), // Clean phone number
                from: FROM_NUMBER,
                text: message,
            }),
        });

        const data = await response.json();

        if (data.messages && data.messages[0].status === "0") {
            // Success
            log.status = "sent";
            storeSmsLog(log);
            
            return {
                success: true,
                messageId: data.messages[0]["message-id"],
                log,
            };
        } else {
            // Failed
            const errorText = data.messages?.[0]?.["error-text"] || "Unknown error";
            log.status = "failed";
            storeSmsLog(log);
            
            return {
                success: false,
                error: errorText,
                log,
            };
        }
    } catch (error) {
        log.status = "failed";
        storeSmsLog(log);
        
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
            log,
        };
    }
}

/**
 * Store SMS log in localStorage
 */
function storeSmsLog(log: SmsLog): void {
    try {
        const stored = localStorage.getItem("drumvale_sms_logs");
        const logs: Record<string, SmsLog> = stored ? JSON.parse(stored) : {};
        logs[log.id] = log;
        localStorage.setItem("drumvale_sms_logs", JSON.stringify(logs));
    } catch (error) {
        console.error("Failed to store SMS log:", error);
    }
}

/**
 * Get all SMS logs
 */
export function getSmsLogs(): SmsLog[] {
    try {
        const stored = localStorage.getItem("drumvale_sms_logs");
        if (!stored) return [];
        const logs: Record<string, SmsLog> = JSON.parse(stored);
        return Object.values(logs).sort((a, b) => 
            new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        );
    } catch (error) {
        console.error("Failed to retrieve SMS logs:", error);
        return [];
    }
}

/**
 * Get SMS logs for a specific application
 */
export function getSmsLogsByApplication(applicationId: string): SmsLog[] {
    return getSmsLogs().filter(log => log.relatedApplicationId === applicationId);
}

// ── Pre-defined message templates ────────────────────────────────────────────

export const SMS_TEMPLATES = {
    applicationSubmitted: (studentName: string, applicationId: string) =>
        `Dear Parent, your application for ${studentName} has been received (ID: ${applicationId}). We will review it within 5-7 academic days. - Drumvale Secondary School`,

    applicationApproved: (studentName: string, applicationId: string) =>
        `Great news! ${studentName}'s application (${applicationId}) has been APPROVED. Please log in to the Parent Portal to pay fees and proceed. - Drumvale School`,

    applicationRejected: (studentName: string, reason: string) =>
        `We regret to inform you that ${studentName}'s application was not successful. Reason: ${reason}. You may reapply next term. - Drumvale School`,

    feesReceived: (studentName: string, amount: number) =>
        `Payment of $${amount.toLocaleString()} received for ${studentName}. Your child can now access the Student Portal for assessment. - Drumvale School`,

    assessmentReminder: (studentName: string) =>
        `Reminder: ${studentName} needs to complete the entrance assessment via the Student Portal. Login credentials sent separately. - Drumvale School`,

    enrollmentComplete: (studentName: string, admissionNumber: string) =>
        `Congratulations! ${studentName} is now enrolled at Drumvale Secondary School. Admission Number: ${admissionNumber}. Welcome to our community! - Drumvale School`,
};

/**
 * Send application submitted notification
 */
export async function notifyApplicationSubmitted(
    parentPhone: string,
    studentName: string,
    applicationId: string
): Promise<SendSmsResult> {
    return sendSms({
        to: parentPhone,
        message: SMS_TEMPLATES.applicationSubmitted(studentName, applicationId),
        relatedApplicationId: applicationId,
    });
}

/**
 * Send application approved notification
 */
export async function notifyApplicationApproved(
    parentPhone: string,
    studentName: string,
    applicationId: string
): Promise<SendSmsResult> {
    return sendSms({
        to: parentPhone,
        message: SMS_TEMPLATES.applicationApproved(studentName, applicationId),
        relatedApplicationId: applicationId,
    });
}

/**
 * Send application rejected notification
 */
export async function notifyApplicationRejected(
    parentPhone: string,
    studentName: string,
    reason: string,
    applicationId: string
): Promise<SendSmsResult> {
    return sendSms({
        to: parentPhone,
        message: SMS_TEMPLATES.applicationRejected(studentName, reason),
        relatedApplicationId: applicationId,
    });
}

/**
 * Send fees received notification
 */
export async function notifyFeesReceived(
    parentPhone: string,
    studentName: string,
    amount: number,
    applicationId: string
): Promise<SendSmsResult> {
    return sendSms({
        to: parentPhone,
        message: SMS_TEMPLATES.feesReceived(studentName, amount),
        relatedApplicationId: applicationId,
    });
}

/**
 * Send enrollment complete notification
 */
export async function notifyEnrollmentComplete(
    parentPhone: string,
    studentName: string,
    admissionNumber: string,
    applicationId: string
): Promise<SendSmsResult> {
    return sendSms({
        to: parentPhone,
        message: SMS_TEMPLATES.enrollmentComplete(studentName, admissionNumber),
        relatedApplicationId: applicationId,
    });
}
