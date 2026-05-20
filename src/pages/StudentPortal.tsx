import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePortal } from "@/context/PortalContext";
import { CheckCircle, XCircle, BookOpen, MessageSquare, Award } from "lucide-react";

const ASSESSMENT_QUESTIONS = [
    {
        id: 1,
        subject: "Mathematics",
        question: "What is the value of x in: 2x + 6 = 14?",
        options: ["3", "4", "5", "6"],
        correct: 1,
    },
    {
        id: 2,
        subject: "English",
        question: "Choose the correct sentence:",
        options: [
            "She don't like apples.",
            "She doesn't likes apples.",
            "She doesn't like apples.",
            "She not like apples.",
        ],
        correct: 2,
    },
    {
        id: 3,
        subject: "Science",
        question: "What is the chemical symbol for water?",
        options: ["WA", "H2O", "HO2", "W2O"],
        correct: 1,
    },
    {
        id: 4,
        subject: "Mathematics",
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
    },
    {
        id: 5,
        subject: "English",
        question: "What is the synonym of 'benevolent'?",
        options: ["Cruel", "Kind", "Angry", "Lazy"],
        correct: 1,
    },
];

const INTERVIEW_QUESTIONS = [
    "Why do you want to join Drumvale Secondary School?",
    "What are your academic strengths and areas for improvement?",
    "Describe a challenge you have overcome and what you learned from it.",
    "What extracurricular activities are you interested in?",
    "Where do you see yourself in 5 years?",
];

const StudentPortal = () => {
    const { applications, recordAssessment, recordInterview } = usePortal();
    const [appId, setAppId] = useState("");
    const [currentApp, setCurrentApp] = useState<typeof applications[0] | null>(null);
    const [phase, setPhase] = useState<"lookup" | "assessment" | "interview" | "result">("lookup");
    const [answers, setAnswers] = useState<number[]>([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [interviewAnswers, setInterviewAnswers] = useState<string[]>(Array(INTERVIEW_QUESTIONS.length).fill(""));
    const [currentIntQ, setCurrentIntQ] = useState(0);
    const [score, setScore] = useState(0);
    const [passed, setPassed] = useState(false);

    const lookupApplication = () => {
        const app = applications.find((a) => a.id === appId);
        if (!app) { alert("Application not found. Please check your Application ID."); return; }
        if (app.status === "submitted") { alert("Your application is still under review. Please wait for school approval."); return; }
        if (app.status === "approved" && !app.feesPaid) { alert("Please complete fee payment in the Parent Portal before proceeding."); return; }
        if (app.status === "enrolled") { alert(`You are already enrolled! Admission Number: ${app.admissionNumber}`); return; }
        if (app.status !== "assessment" && app.status !== "interview") { alert("Your application is not yet ready for assessment. Status: " + app.status); return; }
        setCurrentApp(app);
        setPhase(app.status === "interview" ? "interview" : "assessment");
    };

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);
        if (currentQ < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            // Calculate score
            const correct = newAnswers.filter((a, i) => a === ASSESSMENT_QUESTIONS[i].correct).length;
            const pct = (correct / ASSESSMENT_QUESTIONS.length) * 100;
            setScore(pct);
            if (pct >= 60) {
                recordAssessment(currentApp!.id, pct);
                setCurrentApp((prev) => prev ? { ...prev, status: "interview", assessmentScore: pct } : prev);
                setPhase("interview");
            } else {
                setPassed(false);
                recordAssessment(currentApp!.id, pct);
                setPhase("result");
            }
        }
    };

    const handleInterviewAnswer = (value: string) => {
        const updated = [...interviewAnswers];
        updated[currentIntQ] = value;
        setInterviewAnswers(updated);
    };

    const submitInterview = async () => {
        const allAnswered = interviewAnswers.every((a) => a.trim().length > 20);
        if (!allAnswered) { alert("Please provide detailed answers (at least 20 characters each) for all questions."); return; }
        await recordInterview(currentApp!.id, true);
        // Get the updated app to show admission number
        const updated = applications.find((a) => a.id === currentApp!.id);
        if (updated) setCurrentApp(updated);
        setPassed(true);
        setPhase("result");
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="heading-lg text-foreground">Student Portal</h1>
                        <p className="text-muted-foreground">Assessment & Enrollment</p>
                    </div>

                    {phase === "lookup" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Access Your Assessment</CardTitle>
                                <CardDescription>Enter your Application ID to begin. Your application must be approved and fees paid.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="appId">Application ID</Label>
                                    <Input
                                        id="appId"
                                        placeholder="e.g. APP2024001"
                                        value={appId}
                                        onChange={(e) => setAppId(e.target.value)}
                                    />
                                </div>
                                <Button onClick={lookupApplication} className="w-full">Continue</Button>
                                <Alert>
                                    <AlertDescription>
                                        Demo: Use application ID <strong>APP2024001</strong> to test the assessment flow.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    )}

                    {phase === "assessment" && currentApp && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                <BookOpen className="w-5 h-5" /> Entrance Assessment
                                            </CardTitle>
                                            <CardDescription>
                                                {currentApp.studentFirstName} {currentApp.studentLastName} — {currentApp.gradeApplying}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary">Question {currentQ + 1} of {ASSESSMENT_QUESTIONS.length}</Badge>
                                    </div>
                                    <Progress value={((currentQ) / ASSESSMENT_QUESTIONS.length) * 100} className="mt-2" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-muted rounded-lg p-4">
                                        <p className="text-xs font-semibold text-accent uppercase mb-2">{ASSESSMENT_QUESTIONS[currentQ].subject}</p>
                                        <p className="text-lg font-medium">{ASSESSMENT_QUESTIONS[currentQ].question}</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {ASSESSMENT_QUESTIONS[currentQ].options.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(i)}
                                                className="text-left p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                                            >
                                                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {phase === "interview" && currentApp && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5" /> Interview Questions
                                    </CardTitle>
                                    <CardDescription>
                                        Please answer all questions thoughtfully. Question {currentIntQ + 1} of {INTERVIEW_QUESTIONS.length}
                                    </CardDescription>
                                    <Progress value={((currentIntQ) / INTERVIEW_QUESTIONS.length) * 100} className="mt-2" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {currentApp.assessmentScore !== undefined && (
                                        <Alert>
                                            <CheckCircle className="w-4 h-4" />
                                            <AlertDescription>
                                                Assessment passed with {currentApp.assessmentScore.toFixed(0)}%! Now complete the interview.
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    <div className="bg-muted rounded-lg p-4">
                                        <p className="text-lg font-medium">{INTERVIEW_QUESTIONS[currentIntQ]}</p>
                                    </div>
                                    <textarea
                                        className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                        placeholder="Type your answer here..."
                                        value={interviewAnswers[currentIntQ]}
                                        onChange={(e) => handleInterviewAnswer(e.target.value)}
                                    />
                                    <div className="flex gap-3">
                                        {currentIntQ > 0 && (
                                            <Button variant="outline" onClick={() => setCurrentIntQ(currentIntQ - 1)}>Previous</Button>
                                        )}
                                        {currentIntQ < INTERVIEW_QUESTIONS.length - 1 ? (
                                            <Button onClick={() => setCurrentIntQ(currentIntQ + 1)} className="ml-auto">Next Question</Button>
                                        ) : (
                                            <Button onClick={submitInterview} className="ml-auto">Submit Interview</Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {phase === "result" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    {passed ? <CheckCircle className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                                    {passed ? "Congratulations!" : "Assessment Result"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {passed ? (
                                    <>
                                        <Alert>
                                            <Award className="w-4 h-4" />
                                            <AlertDescription>
                                                You have successfully completed the assessment and interview. The school will process your enrollment and issue your admission letter. Please check your email for further instructions.
                                            </AlertDescription>
                                        </Alert>
                                        <div className="bg-muted rounded-lg p-4 text-center">
                                            <p className="text-sm text-muted-foreground">Your admission number has been generated</p>
                                            <p className="text-2xl font-bold text-primary mt-1">
                                                {applications.find((a) => a.id === currentApp?.id)?.admissionNumber}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <Alert>
                                        <AlertDescription>
                                            Unfortunately, you did not meet the minimum score requirement ({score.toFixed(0)}% — minimum 60%). You may reapply in the next intake. Please contact admissions@drumvale.edu for guidance.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button variant="outline" onClick={() => { setPhase("lookup"); setAppId(""); setCurrentApp(null); setAnswers([]); setCurrentQ(0); setInterviewAnswers(Array(INTERVIEW_QUESTIONS.length).fill("")); setCurrentIntQ(0); }} className="w-full">
                                    Back to Portal
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StudentPortal;
