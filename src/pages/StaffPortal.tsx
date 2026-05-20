import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePortal, MOCK_STAFF } from "@/context/PortalContext";
import { User, Calendar, BookOpen, Users, CheckCircle, XCircle, Clock, Pencil, Save, X, KeyRound } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const StaffPortal = () => {
    const { staffUser, staffLogin, staffLogout, applications, students, smsLogs, stats, approveApplication, rejectApplication, updateStaffCredentials } = usePortal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Credential editing state
    const [editingCredentials, setEditingCredentials] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editCurrentPw, setEditCurrentPw] = useState("");
    const [editNewPw, setEditNewPw] = useState("");
    const [editConfirmPw, setEditConfirmPw] = useState("");
    const [credentialMsg, setCredentialMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = staffLogin(email, password);
        if (!ok) setLoginError("Invalid email or password. Please try again.");
        else setLoginError("");
    };

    const handleApprove = async (appId: string) => {
        await approveApplication(appId);
    };

    const handleReject = async (appId: string) => {
        await rejectApplication(appId);
    };

    const startEditCredentials = () => {
        if (!staffUser) return;
        setEditName(staffUser.name);
        setEditEmail(staffUser.email);
        setEditPhone(staffUser.phone);
        setEditCurrentPw("");
        setEditNewPw("");
        setEditConfirmPw("");
        setCredentialMsg(null);
        setEditingCredentials(true);
    };

    const saveCredentials = () => {
        if (!staffUser) return;
        // Validate password change if attempted
        if (editNewPw || editConfirmPw) {
            if (editCurrentPw !== staffUser.passwordHash) {
                setCredentialMsg({ type: "error", text: "Current password is incorrect." });
                return;
            }
            if (editNewPw.length < 6) {
                setCredentialMsg({ type: "error", text: "New password must be at least 6 characters." });
                return;
            }
            if (editNewPw !== editConfirmPw) {
                setCredentialMsg({ type: "error", text: "New passwords do not match." });
                return;
            }
        }
        const patch: { name?: string; email?: string; phone?: string; passwordHash?: string } = {
            name: editName,
            email: editEmail,
            phone: editPhone,
        };
        if (editNewPw) patch.passwordHash = editNewPw;
        const ok = updateStaffCredentials(staffUser.id, patch);
        if (ok) {
            setCredentialMsg({ type: "success", text: "Credentials updated successfully." });
            setEditingCredentials(false);
        } else {
            setCredentialMsg({ type: "error", text: "Failed to update credentials." });
        }
    };

    const pendingApps = applications.filter((a) => a.status === "submitted");
    const allApps = applications;

    const getStatusBadge = (status: string) => {
        const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
            submitted: { label: "Pending Review", variant: "secondary" },
            approved: { label: "Approved", variant: "default" },
            rejected: { label: "Rejected", variant: "destructive" },
            assessment: { label: "In Assessment", variant: "default" },
            interview: { label: "In Interview", variant: "default" },
            enrolled: { label: "Enrolled", variant: "default" },
        };
        const { label, variant } = map[status] || { label: status, variant: "outline" as const };
        return <Badge variant={variant}>{label}</Badge>;
    };

    if (!staffUser) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-32 pb-20 px-4">
                    <div className="max-w-md mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle>Staff Portal Login</CardTitle>
                                <CardDescription>Use your Drumvale staff credentials to sign in</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <Label htmlFor="email">Staff Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@drumvale.edu"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {loginError && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{loginError}</AlertDescription>
                                        </Alert>
                                    )}
                                    <Button type="submit" className="w-full">Sign In</Button>
                                </form>
                                <div className="mt-4 p-3 bg-muted rounded-lg">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2">Demo Credentials:</p>
                                    {MOCK_STAFF.map((s) => (
                                        <p key={s.id} className="text-xs text-muted-foreground">
                                            {s.email} / {s.passwordHash}
                                        </p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="heading-lg text-foreground">Staff Portal</h1>
                            <p className="text-muted-foreground">{staffUser.role} — {staffUser.department}</p>
                        </div>
                        <Button variant="outline" onClick={staffLogout}>Logout</Button>
                    </div>

                    <Tabs defaultValue="profile">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="profile">My Profile</TabsTrigger>
                            <TabsTrigger value="timetable">Timetable</TabsTrigger>
                            <TabsTrigger value="applications">Applications</TabsTrigger>
                            <TabsTrigger value="students">Students</TabsTrigger>
                            <TabsTrigger value="database">Database</TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Avatar card */}
                                <Card className="md:col-span-1">
                                    <CardContent className="pt-6 text-center">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-4 flex items-center justify-center">
                                            <User className="w-12 h-12 text-primary-foreground" />
                                        </div>
                                        <h2 className="font-heading font-bold text-xl">{staffUser.name}</h2>
                                        <p className="text-accent font-semibold">{staffUser.role}</p>
                                        <Badge variant="secondary" className="mt-2">{staffUser.department}</Badge>
                                        <div className="mt-4">
                                            <Button size="sm" variant="outline" onClick={startEditCredentials} className="w-full">
                                                <Pencil className="w-3 h-3 mr-2" /> Edit Credentials
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Details / Edit card */}
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            Staff Details
                                            {!editingCredentials && (
                                                <Button size="sm" variant="ghost" onClick={startEditCredentials}>
                                                    <Pencil className="w-4 h-4 mr-1" /> Edit
                                                </Button>
                                            )}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {credentialMsg && (
                                            <Alert variant={credentialMsg.type === "error" ? "destructive" : "default"} className="mb-4">
                                                <AlertDescription>{credentialMsg.text}</AlertDescription>
                                            </Alert>
                                        )}

                                        {editingCredentials ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>Full Name</Label>
                                                        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <Label>Email</Label>
                                                        <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <Label>Phone</Label>
                                                        <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="border-t pt-4">
                                                    <p className="text-sm font-semibold flex items-center gap-2 mb-3">
                                                        <KeyRound className="w-4 h-4" /> Change Password (optional)
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <Label>Current Password</Label>
                                                            <Input type="password" value={editCurrentPw} onChange={(e) => setEditCurrentPw(e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>New Password</Label>
                                                            <Input type="password" value={editNewPw} onChange={(e) => setEditNewPw(e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Confirm New Password</Label>
                                                            <Input type="password" value={editConfirmPw} onChange={(e) => setEditConfirmPw(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Button onClick={saveCredentials}>
                                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                                    </Button>
                                                    <Button variant="outline" onClick={() => { setEditingCredentials(false); setCredentialMsg(null); }}>
                                                        <X className="w-4 h-4 mr-2" /> Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Staff ID</p>
                                                    <p className="font-semibold">{staffUser.id}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Email</p>
                                                    <p className="font-semibold">{staffUser.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Phone</p>
                                                    <p className="font-semibold">{staffUser.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Join Date</p>
                                                    <p className="font-semibold">{staffUser.joinDate}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-sm text-muted-foreground">Subjects Teaching</p>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {staffUser.subjects.map((s) => (
                                                            <Badge key={s} variant="outline" className="text-accent border-accent">{s}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Quick Stats */}
                                <Card className="md:col-span-3">
                                    <CardHeader><CardTitle>Quick Stats</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <BookOpen className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                <p className="text-2xl font-bold">{staffUser.timetable.length}</p>
                                                <p className="text-sm text-muted-foreground">Classes / Week</p>
                                            </div>
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <BookOpen className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                <p className="text-2xl font-bold">{staffUser.subjects.length}</p>
                                                <p className="text-sm text-muted-foreground">Subjects Teaching</p>
                                            </div>
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                <p className="text-2xl font-bold">{stats.totalStudents}</p>
                                                <p className="text-sm text-muted-foreground">Enrolled Students</p>
                                            </div>
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <Clock className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                <p className="text-2xl font-bold">{stats.pending}</p>
                                                <p className="text-sm text-muted-foreground">Pending Applications</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Subjects detail */}
                                {staffUser.subjects.length > 0 && (
                                    <Card className="md:col-span-3">
                                        <CardHeader><CardTitle>Subjects I Teach</CardTitle></CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {staffUser.subjects.map((subject) => {
                                                    const classesForSubject = staffUser.timetable.filter((t) => t.subject === subject);
                                                    return (
                                                        <div key={subject} className="border rounded-lg p-4">
                                                            <p className="font-semibold text-accent">{subject}</p>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {classesForSubject.length} class{classesForSubject.length !== 1 ? "es" : ""} per week
                                                            </p>
                                                            {classesForSubject.length > 0 && (
                                                                <div className="mt-2 space-y-1">
                                                                    {classesForSubject.map((c, i) => (
                                                                        <p key={i} className="text-xs text-muted-foreground">
                                                                            {c.day} P{c.period} · {c.class} · {c.room}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </TabsContent>

                        {/* Timetable Tab */}
                        <TabsContent value="timetable">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" /> Weekly Timetable
                                    </CardTitle>
                                    <CardDescription>{staffUser.name} — {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {staffUser.timetable.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">No timetable assigned yet. Contact the administration office.</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Day</TableHead>
                                                        <TableHead>Period</TableHead>
                                                        <TableHead>Time</TableHead>
                                                        <TableHead>Subject</TableHead>
                                                        <TableHead>Class</TableHead>
                                                        <TableHead>Room</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {DAYS.map((day) => {
                                                        const dayClasses = staffUser.timetable.filter((t) => t.day === day);
                                                        if (dayClasses.length === 0) return null;
                                                        return dayClasses.map((entry, i) => (
                                                            <TableRow key={`${day}-${i}`} className={day === new Date().toLocaleDateString("en-US", { weekday: "long" }) ? "bg-accent/10" : ""}>
                                                                {i === 0 && <TableCell rowSpan={dayClasses.length} className="font-semibold">{day}</TableCell>}
                                                                <TableCell>{entry.period}</TableCell>
                                                                <TableCell>{entry.time}</TableCell>
                                                                <TableCell><Badge variant="outline">{entry.subject}</Badge></TableCell>
                                                                <TableCell>{entry.class}</TableCell>
                                                                <TableCell>{entry.room}</TableCell>
                                                            </TableRow>
                                                        ));
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Applications Tab */}
                        <TabsContent value="applications">
                            <div className="space-y-6">
                                {pendingApps.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-amber-500" />
                                                Pending Review ({pendingApps.length})
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {pendingApps.map((app) => (
                                                <div key={app.id} className="border rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="font-semibold">{app.studentFirstName} {app.studentLastName}</h3>
                                                            <p className="text-sm text-muted-foreground">ID: {app.id} | Grade: {app.gradeApplying} | DOB: {app.studentDOB}</p>
                                                            <p className="text-sm text-muted-foreground">Parent: {app.parentName} ({app.parentEmail})</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={app.transcriptFile ? "default" : "destructive"}>
                                                                {app.transcriptFile ? "✓ Transcripts" : "✗ Transcripts"}
                                                            </Badge>
                                                            <Badge variant={app.birthCertFile ? "default" : "destructive"}>
                                                                {app.birthCertFile ? "✓ Birth Cert" : "✗ Birth Cert"}
                                                            </Badge>
                                                            <Badge variant={app.parentIdFile ? "default" : "destructive"}>
                                                                {app.parentIdFile ? "✓ Parent ID" : "✗ Parent ID"}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={() => handleApprove(app.id)} className="bg-green-600 hover:bg-green-700">
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                        </Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleReject(app.id)}>
                                                            <XCircle className="w-4 h-4 mr-1" /> Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}

                                <Card>
                                    <CardHeader>
                                        <CardTitle>All Applications</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>ID</TableHead>
                                                        <TableHead>Student</TableHead>
                                                        <TableHead>Grade</TableHead>
                                                        <TableHead>Parent</TableHead>
                                                        <TableHead>Submitted</TableHead>
                                                        <TableHead>Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {allApps.map((app) => (
                                                        <TableRow key={app.id}>
                                                            <TableCell className="font-mono text-xs">{app.id}</TableCell>
                                                            <TableCell>{app.studentFirstName} {app.studentLastName}</TableCell>
                                                            <TableCell>{app.gradeApplying}</TableCell>
                                                            <TableCell>{app.parentName}</TableCell>
                                                            <TableCell>{app.submittedAt}</TableCell>
                                                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Students Tab */}
                        <TabsContent value="students">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="w-5 h-5" /> Enrolled Students
                                    </CardTitle>
                                    <CardDescription>Students currently enrolled in the school database</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {students.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">No enrolled students yet</p>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Admission No.</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Grade</TableHead>
                                                    <TableHead>Nationality</TableHead>
                                                    <TableHead>Guardian</TableHead>
                                                    <TableHead>Score</TableHead>
                                                    <TableHead>Enrolled</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {students.map((s) => (
                                                    <TableRow key={s.admissionNumber}>
                                                        <TableCell className="font-mono font-semibold">{s.admissionNumber}</TableCell>
                                                        <TableCell>{s.firstName} {s.lastName}</TableCell>
                                                        <TableCell>{s.grade}</TableCell>
                                                        <TableCell>{s.nationality}</TableCell>
                                                        <TableCell>{s.guardianName}</TableCell>
                                                        <TableCell>{s.assessmentScore}%</TableCell>
                                                        <TableCell>{s.enrolledAt}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Database Tab */}
                        <TabsContent value="database" className="space-y-6">
                            {/* Stats overview */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Total Applications", value: stats.totalApplications, color: "bg-blue-50 text-blue-700" },
                                    { label: "Pending Review",     value: stats.pending,           color: "bg-amber-50 text-amber-700" },
                                    { label: "Enrolled Students",  value: stats.totalStudents,     color: "bg-green-50 text-green-700" },
                                    { label: "Rejected",           value: stats.rejected,          color: "bg-red-50 text-red-700" },
                                    { label: "In Assessment",      value: stats.inAssessment,      color: "bg-purple-50 text-purple-700" },
                                    { label: "In Interview",       value: stats.inInterview,       color: "bg-indigo-50 text-indigo-700" },
                                    { label: "SMS Sent",           value: stats.smsSent,           color: "bg-teal-50 text-teal-700" },
                                    { label: "Fees Collected",     value: `$${stats.totalFeesCollected.toLocaleString()}`, color: "bg-emerald-50 text-emerald-700" },
                                ].map(({ label, value, color }) => (
                                    <div key={label} className={`rounded-lg p-4 text-center ${color}`}>
                                        <p className="text-2xl font-bold">{value}</p>
                                        <p className="text-xs font-medium mt-1">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* SMS Log */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>SMS Log</CardTitle>
                                    <CardDescription>All messages sent to parents</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {smsLogs.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-4">No messages sent yet</p>
                                    ) : (
                                        <div className="space-y-3 max-h-80 overflow-y-auto">
                                            {smsLogs.map((log) => (
                                                <div key={log.id} className="border rounded-lg p-3 text-sm">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-mono text-xs text-muted-foreground">{log.to}</span>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={log.status === "sent" ? "default" : log.status === "demo" ? "secondary" : "destructive"} className="text-xs">
                                                                {log.status}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">{log.sentAt.split("T")[0]}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground">{log.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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

export default StaffPortal;
