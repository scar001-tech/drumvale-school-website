import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, BookOpen, Target } from "lucide-react";

const leaders = [
    { name: "Mr. Samuel Kariuki", role: "Principal", description: "M.Ed. from University of Nairobi with over 20 years in secondary school leadership and curriculum development." },
    { name: "Mrs. Grace Wanjiku", role: "Deputy Principal, Academics", description: "Experienced KCSE examiner and curriculum specialist with expertise in Sciences and Mathematics." },
    { name: "Mr. Peter Otieno", role: "Director of Admissions", description: "Dedicated to guiding families through the enrolment process with over 12 years at Drumvale." },
    { name: "Ms. Faith Muthoni", role: "Head of Student Affairs", description: "Passionate advocate for student welfare, discipline, and co-curricular development." },
];

const About = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
                            alt="Drumvale Secondary School"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">About Us</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Our Story, Our Mission</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">
                            Since 1985, Drumvale Secondary School has been a beacon of academic excellence and character development in Kenya.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="heading-md text-foreground mb-3">Our Mission</h3>
                            <p className="text-body text-muted-foreground">
                                To provide a quality secondary education that develops academically accomplished, morally upright, and socially responsible citizens who contribute meaningfully to Kenya and the world.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="heading-md text-foreground mb-3">Our Vision</h3>
                            <p className="text-body text-muted-foreground">
                                To be the leading secondary school in Kenya, recognized for academic excellence, strong values, and the all-round development of every student.
                            </p>
                        </div>
                    </div>
                </section>

                {/* History */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                                alt="Drumvale history"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Our History</p>
                            <h2 className="heading-lg text-foreground mb-4">Four Decades of Excellence</h2>
                            <p className="text-body text-muted-foreground mb-4">
                                Founded in 1985 by a group of dedicated Kenyan educators, Drumvale Secondary School opened its doors with 80 students and a firm commitment to quality education. Over the decades, the school has grown into one of the most respected secondary institutions in the region.
                            </p>
                            <p className="text-body text-muted-foreground">
                                From our humble beginnings, we have consistently produced top KCSE candidates, national sports champions, and community leaders. Today, Drumvale serves over 800 students in Form 1–4 and Grade 9–12, guided by experienced teachers and a strong tradition of discipline and excellence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Leadership</p>
                            <h2 className="heading-lg text-foreground">Meet Our Team</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {leaders.map((leader) => (
                                <div key={leader.name} className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-4 flex items-center justify-center">
                                        <Users className="w-8 h-8 text-primary-foreground" />
                                    </div>
                                    <h4 className="font-heading font-semibold text-foreground">{leader.name}</h4>
                                    <p className="text-accent text-sm font-heading mb-2">{leader.role}</p>
                                    <p className="text-xs text-muted-foreground">{leader.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section className="section-padding bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Achievements</p>
                        <h2 className="heading-lg text-foreground mb-8">Our Standards & Milestones</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Top 100 KCSE School", sub: "Nationally Ranked" },
                                { label: "County Champions", sub: "Athletics 2024" },
                                { label: "Best School Drama", sub: "Regional Festival 2023" },
                                { label: "KNEC Exam Centre", sub: "Certified Since 1990" },
                            ].map((item) => (
                                <div key={item.label} className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center gap-2">
                                    <Award className="w-8 h-8 text-accent" />
                                    <span className="font-heading font-semibold text-sm text-foreground text-center">{item.label}</span>
                                    <span className="text-xs text-muted-foreground text-center">{item.sub}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
