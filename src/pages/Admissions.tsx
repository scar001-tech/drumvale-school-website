import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, FileText, CheckCircle, ArrowRight } from "lucide-react";

const Admissions = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">
                            Join Our Community
                        </p>
                        <h1 className="heading-lg text-foreground mb-4">Admissions</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Welcome to Drumvale Secondary School admissions. Choose your portal below to begin the application process or continue your enrollment journey.
                        </p>
                    </div>

                    {/* Portal Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* Parent Portal Card */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">Parent Portal</CardTitle>
                                <CardDescription className="text-base">
                                    For parents and guardians applying for admission
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Submit new admission applications
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Track application status with SMS updates
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Upload required documents
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Pay school fees online
                                        </p>
                                    </div>
                                </div>
                                <Link to="/portal/parents">
                                    <Button className="w-full" size="lg">
                                        Go to Parent Portal
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Student Portal Card */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                                    <GraduationCap className="w-6 h-6 text-accent" />
                                </div>
                                <CardTitle className="text-2xl">Student Portal</CardTitle>
                                <CardDescription className="text-base">
                                    For students completing assessment and interview
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Complete entrance assessment
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Participate in virtual interview
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            View assessment results
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            Receive admission number upon enrollment
                                        </p>
                                    </div>
                                </div>
                                <Link to="/portal/students">
                                    <Button className="w-full" size="lg" variant="outline">
                                        Go to Student Portal
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Admission Process */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-5 h-5 text-accent" />
                                <CardTitle>Admission Process</CardTitle>
                            </div>
                            <CardDescription>
                                Follow these steps to complete your admission to Drumvale Secondary School
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    {
                                        step: "1",
                                        title: "Submit Application",
                                        description: "Parents submit the application form through the Parent Portal with required documents.",
                                        portal: "Parent Portal"
                                    },
                                    {
                                        step: "2",
                                        title: "SMS Confirmation",
                                        description: "Receive SMS confirmation with your application ID. Track status via SMS updates.",
                                        portal: "Automated"
                                    },
                                    {
                                        step: "3",
                                        title: "Application Review",
                                        description: "Our admissions team reviews your application (5-7 business days).",
                                        portal: "School Staff"
                                    },
                                    {
                                        step: "4",
                                        title: "Approval & Payment",
                                        description: "If approved, receive SMS notification and pay school fees through the Parent Portal.",
                                        portal: "Parent Portal"
                                    },
                                    {
                                        step: "5",
                                        title: "Assessment & Interview",
                                        description: "Student completes entrance assessment and virtual interview via Student Portal.",
                                        portal: "Student Portal"
                                    },
                                    {
                                        step: "6",
                                        title: "Enrollment",
                                        description: "Upon passing, receive admission number via SMS and welcome to Drumvale!",
                                        portal: "Automated"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                {item.step}
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-6 border-l-2 border-muted pl-6 ml-5 -mt-1">
                                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                            <p className="text-muted-foreground mb-2">{item.description}</p>
                                            <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
                                                {item.portal}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="mt-12 text-center">
                        <h3 className="font-heading font-semibold text-xl mb-4">Need Help?</h3>
                        <p className="text-muted-foreground mb-4">
                            Our admissions team is here to assist you throughout the process.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div>
                                <span className="font-medium">Email:</span>{" "}
                                <a href="mailto:admissions@drumvale.edu" className="text-primary hover:underline">
                                    admissions@drumvale.edu
                                </a>
                            </div>
                            <div>
                                <span className="font-medium">Phone:</span>{" "}
                                <a href="tel:+15551234567" className="text-primary hover:underline">
                                    +1 (555) 123-4567
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Admissions;
