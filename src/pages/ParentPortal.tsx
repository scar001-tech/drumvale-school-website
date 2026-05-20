import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import type { Gender, Relationship, Grade } from "@/db/schema";
import { usePortal, type UploadedFile } from "@/context/PortalContext";
import {
    CheckCircle, Clock, CheckCheck, Upload, FileText,
    DollarSign, School, Phone, User, BookOpen, X
} from "lucide-react";

// ── File upload helper ─────────────────────────────────────────────────────

const readFileAsDataUrl = (file: File): Promise<UploadedFile> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
            resolve({ name: file.name, dataUrl: reader.result as string, type: file.type, uploadedAt: new Date().toISOString() });
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

// ── File Upload Widget ─────────────────────────────────────────────────────

interface FileUploadProps {
    label: string;
    accept: string;
    hint: string;
    value: UploadedFile | undefined;
    onChange: (file: UploadedFile | undefined) => void;
    required?: boolean;
}

const FileUpload = ({ label, accept, hint, value, onChange, required }: FileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const uploaded = await readFileAsDataUrl(file);
        onChange(uploaded);
    };

    return (
        <div>
            <Label className="mb-1 block">
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <p className="text-xs text-muted-foreground mb-2">{hint}</p>
            {value ? (
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted">
                    <FileText className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm flex-1 truncate">{value.name}</span>
                    <button
                        type="button"
                        onClick={() => { onChange(undefined); if (inputRef.current) inputRef.current.value = ""; }}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="w-full flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
                >
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                </button>
            )}
            <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
        </div>
    );
};

// ── Status Badge ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
        submitted: { label: "Pending Approval", variant: "secondary" },
        approved: { label: "Approved", variant: "default" },
        rejected: { label: "Rejected", variant: "destructive" },
        assessment: { label: "Assessment Phase", variant: "default" },
        interview: { label: "Interview Phase", variant: "default" },
        enrolled: { label: "Enrolled ✓", variant: "default" },
    };
    const { label, variant } = map[status] || { label: status, variant: "outline" as const };
    return <Badge variant={variant}>{label}</Badge>;
};

// ── Main Component ─────────────────────────────────────────────────────────

const EMPTY_FORM = {
    studentFirstName: "",
    studentLastName: "",
    studentDOB: "",
    studentGender: "",
    studentNationality: "",
    gradeApplying: "",
    parentName: "",
    parentIdNumber: "",
    parentEmail: "",
    parentPhone: "",
    parentRelationship: "",
    transcriptFile: undefined as UploadedFile | undefined,
    birthCertFile: undefined as UploadedFile | undefined,
    parentIdFile: undefined as UploadedFile | undefined,
};

const ParentPortal = () => {
    const { submitApplication, applications, recordPayment } = usePortal();
    const [activeTab, setActiveTab] = useState("overview");
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [submitting, setSubmitting] = useState(false);
    const [submittedId, setSubmittedId] = useState<string | null>(null);
    const [lookupId, setLookupId] = useState("");
    const [lookedUp, setLookedUp] = useState(false);

    const set = (field: string, value: string | UploadedFile | undefined) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const myApplications = lookupId
        ? applications.filter((a) => a.id === lookupId)
        : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.transcriptFile) { alert("Please upload the student's academic transcripts."); return; }
        if (!form.birthCertFile) { alert("Please upload the student's birth certificate."); return; }
        if (!form.parentIdFile) { alert("Please upload your national ID."); return; }

        setSubmitting(true);
        try {
            const id = await submitApplication({
                studentFirstName: form.studentFirstName,
                studentLastName: form.studentLastName,
                studentDOB: form.studentDOB,
                studentGender: form.studentGender as Gender,
                studentNationality: form.studentNationality,
                gradeApplying: form.gradeApplying as Grade,
                parentName: form.parentName,
                parentIdNumber: form.parentIdNumber,
                parentEmail: form.parentEmail,
                parentPhone: form.parentPhone,
                parentRelationship: form.parentRelationship as Relationship,
                transcriptFile: form.transcriptFile,
                birthCertFile: form.birthCertFile,
                parentIdFile: form.parentIdFile,
            });
            setSubmittedId(id);
            setLookupId(id);
            setForm({ ...EMPTY_FORM });
            setActiveTab("status");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePayment = async (appId: string) => {
        await recordPayment(appId, 13300);
        alert("Payment successful! Your child can now proceed to the Student Portal for assessment and interview.");
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Page header */}
                    <div className="mb-8">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-1">Drumvale Secondary School</p>
                        <h1 className="heading-lg text-foreground">Parent Portal</h1>
                        <p className="text-muted-foreground">Apply for admission, track your application, and manage fees.</p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="overview">
                                <School className="w-4 h-4 mr-2" /> Overview
                            </TabsTrigger>
                            <TabsTrigger value="apply">
                                <BookOpen className="w-4 h-4 mr-2" /> Apply Now
                            </TabsTrigger>
                            <TabsTrigger value="status">
                                <Clock className="w-4 h-4 mr-2" /> Track Application
                            </TabsTrigger>
                        </TabsList>

                        {/* ── OVERVIEW ── */}
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>School Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <p className="font-semibold text-base">Drumvale Secondary School</p>
                                        <p className="text-muted-foreground">Founded 1985 · CIS & WASC Accredited · IB World School</p>
                                        <div className="space-y-1 pt-2">
                                            <p><span className="font-medium">Email:</span> admissions@drumvale.edu</p>
                                            <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
                                            <p><span className="font-medium">Address:</span> 123 Education Drive, Academic City</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Fee Structure (Annual)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <div className="flex justify-between py-2 border-b"><span>Tuition Fee</span><span className="font-semibold">$12,000</span></div>
                                        <div className="flex justify-between py-2 border-b"><span>Registration Fee</span><span className="font-semibold">$500</span></div>
                                        <div className="flex justify-between py-2 border-b"><span>Activity Fee</span><span className="font-semibold">$800</span></div>
                                        <div className="flex justify-between py-2 font-bold text-base"><span>Total</span><span>$13,300</span></div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader><CardTitle>Admission Process</CardTitle></CardHeader>
                                <CardContent>
                                    <ol className="space-y-4">
                                        {[
                                            ["Submit Application", "Complete the form with student & parent details and upload required documents."],
                                            ["SMS Confirmation", "You will receive an SMS confirming your application is pending review."],
                                            ["School Review", "The admissions team reviews your application (5–7 business days)."],
                                            ["SMS Decision", "You will receive an SMS informing you of approval or rejection."],
                                            ["Pay Fees", "If approved, pay school fees through the portal to proceed."],
                                            ["Assessment & Interview", "Your child completes an entrance assessment and interview via the Student Portal."],
                                            ["Enrollment", "Upon passing, your child is enrolled and issued an admission number."],
                                        ].map(([title, desc], i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                                                <div>
                                                    <p className="font-semibold">{title}</p>
                                                    <p className="text-sm text-muted-foreground">{desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ── APPLICATION FORM ── */}
                        <TabsContent value="apply">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New Admission Application</CardTitle>
                                    <CardDescription>All fields marked * are required. An SMS will be sent to your phone upon submission.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-8">

                                        {/* Student Information */}
                                        <section>
                                            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                                                <User className="w-5 h-5 text-accent" /> Student Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="sfn">First Name *</Label>
                                                    <Input id="sfn" value={form.studentFirstName} onChange={(e) => set("studentFirstName", e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="sln">Last Name *</Label>
                                                    <Input id="sln" value={form.studentLastName} onChange={(e) => set("studentLastName", e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="sdob">Date of Birth *</Label>
                                                    <Input id="sdob" type="date" value={form.studentDOB} onChange={(e) => set("studentDOB", e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="sgender">Gender *</Label>
                                                    <Select value={form.studentGender} onValueChange={(v) => set("studentGender", v)} required>
                                                        <SelectTrigger id="sgender"><SelectValue placeholder="Select gender" /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label htmlFor="snat">Nationality *</Label>
                                                    <Input id="snat" value={form.studentNationality} onChange={(e) => set("studentNationality", e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="sgrade">Grade Applying For *</Label>
                                                    <Select value={form.gradeApplying} onValueChange={(v) => set("gradeApplying", v)} required>
                                                        <SelectTrigger id="sgrade"><SelectValue placeholder="Select grade" /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Grade 10">Grade 10</SelectItem>
                                                            <SelectItem value="Form 3">Form 3</SelectItem>
                                                            <SelectItem value="Form 4">Form 4</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Parent / Guardian Information */}
                                        <section>
                                            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Phone className="w-5 h-5 text-accent" /> Parent / Guardian Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="pname">Full Name *</Label>
                                                    <Input id="pname" value={form.parentName} onChange={(e) => set("parentName", e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="pid">National ID Number *</Label>
                                                    <Input id="pid" value={form.parentIdNumber} onChange={(e) => set("parentIdNumber", e.target.value)} placeholder="e.g. ID123456789" required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="pphone">Phone Number * <span className="text-xs text-muted-foreground">(SMS notifications)</span></Label>
                                                    <Input id="pphone" type="tel" value={form.parentPhone} onChange={(e) => set("parentPhone", e.target.value)} placeholder="+1234567890" required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="pemail">Email Address</Label>
                                                    <Input id="pemail" type="email" value={form.parentEmail} onChange={(e) => set("parentEmail", e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="prelation">Relationship to Student *</Label>
                                                    <Select value={form.parentRelationship} onValueChange={(v) => set("parentRelationship", v)} required>
                                                        <SelectTrigger id="prelation"><SelectValue placeholder="Select relationship" /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Mother">Mother</SelectItem>
                                                            <SelectItem value="Father">Father</SelectItem>
                                                            <SelectItem value="Guardian">Guardian</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Document Uploads */}
                                        <section>
                                            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-accent" /> Required Documents
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <FileUpload
                                                    label="Academic Transcripts"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    hint="PDF or image of last 2 years' results"
                                                    value={form.transcriptFile}
                                                    onChange={(f) => set("transcriptFile", f)}
                                                    required
                                                />
                                                <FileUpload
                                                    label="Birth Certificate"
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                    hint="Clear image or scan of birth certificate"
                                                    value={form.birthCertFile}
                                                    onChange={(f) => set("birthCertFile", f)}
                                                    required
                                                />
                                                <FileUpload
                                                    label="Parent's National ID"
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                    hint="Clear image of your national ID card"
                                                    value={form.parentIdFile}
                                                    onChange={(f) => set("parentIdFile", f)}
                                                    required
                                                />
                                            </div>
                                        </section>

                                        <Alert>
                                            <Phone className="w-4 h-4" />
                                            <AlertDescription>
                                                An SMS will be sent to <strong>{form.parentPhone || "your phone number"}</strong> confirming your submission. You will also receive an SMS when the school makes a decision.
                                            </AlertDescription>
                                        </Alert>

                                        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                                            {submitting ? "Submitting..." : "Submit Application"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ── STATUS TRACKER ── */}
                        <TabsContent value="status" className="space-y-6">
                            {submittedId && (
                                <Alert>
                                    <CheckCircle className="w-4 h-4" />
                                    <AlertDescription>
                                        Application submitted! Your ID is <strong>{submittedId}</strong>. An SMS has been sent to your phone. Save this ID to track your application below.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Track Your Application</CardTitle>
                                    <CardDescription>Enter your Application ID to view the current status</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="e.g. APP1234567890"
                                            value={lookupId}
                                            onChange={(e) => { setLookupId(e.target.value); setLookedUp(false); }}
                                        />
                                        <Button onClick={() => setLookedUp(true)}>Track</Button>
                                    </div>

                                    {lookedUp && myApplications.length === 0 && (
                                        <p className="text-center text-muted-foreground py-4">No application found with that ID.</p>
                                    )}

                                    {lookedUp && myApplications.map((app) => (
                                        <div key={app.id} className="border rounded-xl p-5 space-y-4">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{app.studentFirstName} {app.studentLastName}</h3>
                                                    <p className="text-sm text-muted-foreground">ID: {app.id} · Grade: {app.gradeApplying}</p>
                                                    <p className="text-sm text-muted-foreground">Parent: {app.parentName} · {app.parentPhone}</p>
                                                </div>
                                                <StatusBadge status={app.status} />
                                            </div>

                                            {/* Timeline */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    <span>Submitted: {app.submittedAt}</span>
                                                </div>
                                                {app.approvedAt && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span>Approved: {app.approvedAt}</span>
                                                    </div>
                                                )}
                                                {app.enrolledAt && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CheckCheck className="w-4 h-4 text-green-600" />
                                                        <span>Enrolled: {app.enrolledAt} · Admission No: <strong>{app.admissionNumber}</strong></span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Uploaded documents preview */}
                                            <div className="flex flex-wrap gap-2">
                                                {app.transcriptFile && (
                                                    <a href={app.transcriptFile.dataUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs bg-muted px-3 py-1.5 rounded-full hover:bg-accent/20">
                                                        <FileText className="w-3 h-3" /> Transcripts
                                                    </a>
                                                )}
                                                {app.birthCertFile && (
                                                    <a href={app.birthCertFile.dataUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs bg-muted px-3 py-1.5 rounded-full hover:bg-accent/20">
                                                        <FileText className="w-3 h-3" /> Birth Certificate
                                                    </a>
                                                )}
                                                {app.parentIdFile && (
                                                    <a href={app.parentIdFile.dataUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs bg-muted px-3 py-1.5 rounded-full hover:bg-accent/20">
                                                        <FileText className="w-3 h-3" /> Parent ID
                                                    </a>
                                                )}
                                            </div>

                                            {/* Approved — awaiting payment */}
                                            {app.status === "approved" && !app.feesPaid && (
                                                <div className="border rounded-lg p-4 bg-muted space-y-3">
                                                    <p className="font-semibold">Your application has been approved! Pay fees to proceed.</p>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Total Fees Due</span>
                                                        <span className="font-bold text-lg">$13,300</span>
                                                    </div>
                                                    <Button onClick={() => handlePayment(app.id)} className="w-full">
                                                        <DollarSign className="w-4 h-4 mr-2" /> Pay Now
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Enrolled */}
                                            {app.status === "enrolled" && (
                                                <Alert>
                                                    <CheckCheck className="w-4 h-4" />
                                                    <AlertDescription>
                                                        Congratulations! {app.studentFirstName} is enrolled at Drumvale Secondary School. Admission Number: <strong>{app.admissionNumber}</strong>
                                                    </AlertDescription>
                                                </Alert>
                                            )}

                                            {/* Rejected */}
                                            {app.status === "rejected" && (
                                                <Alert variant="destructive">
                                                    <AlertDescription>
                                                        This application was not successful. Please contact admissions@drumvale.edu for guidance on reapplying.
                                                    </AlertDescription>
                                                </Alert>
                                            )}

                                            {/* Assessment phase */}
                                            {(app.status === "assessment" || app.status === "interview") && (
                                                <Alert>
                                                    <AlertDescription>
                                                        Fees paid ✓ — Your child should now log in to the <strong>Student Portal</strong> using Application ID <strong>{app.id}</strong> to complete the assessment and interview.
                                                    </AlertDescription>
                                                </Alert>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ParentPortal;
