// ─────────────────────────────────────────────────────────────────────────────
// SMS Log Viewer Component
// ─────────────────────────────────────────────────────────────────────────────

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react";
import type { SmsLog } from "@/db/schema";

interface SmsLogViewerProps {
    logs: SmsLog[];
    title?: string;
    maxHeight?: string;
}

const StatusIcon = ({ status }: { status: SmsLog["status"] }) => {
    switch (status) {
        case "sent":
            return <CheckCircle className="w-4 h-4 text-green-600" />;
        case "failed":
            return <XCircle className="w-4 h-4 text-red-600" />;
        case "demo":
            return <Clock className="w-4 h-4 text-blue-600" />;
        default:
            return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
};

const StatusBadge = ({ status }: { status: SmsLog["status"] }) => {
    const variants: Record<SmsLog["status"], { label: string; variant: "default" | "secondary" | "destructive" }> = {
        sent: { label: "Sent", variant: "default" },
        failed: { label: "Failed", variant: "destructive" },
        demo: { label: "Demo", variant: "secondary" },
    };
    
    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
};

export const SmsLogViewer = ({ logs, title = "SMS Notifications", maxHeight = "600px" }: SmsLogViewerProps) => {
    const sortedLogs = [...logs].sort((a, b) => 
        new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {title}
                </CardTitle>
                <CardDescription>
                    {logs.length} message{logs.length !== 1 ? "s" : ""} sent via Vonage SMS API
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea style={{ maxHeight }}>
                    {sortedLogs.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No SMS messages sent yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {sortedLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className="border rounded-lg p-4 space-y-2 hover:bg-accent/5 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <StatusIcon status={log.status} />
                                            <span className="font-medium">{log.to}</span>
                                        </div>
                                        <StatusBadge status={log.status} />
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                                        {log.message}
                                    </p>
                                    
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>
                                            {new Date(log.sentAt).toLocaleString("en-US", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                        {log.relatedApplicationId && (
                                            <span className="font-mono">
                                                App: {log.relatedApplicationId}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};
