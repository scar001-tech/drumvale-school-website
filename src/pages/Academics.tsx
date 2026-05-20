import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Microscope, Languages, Code } from "lucide-react";

const programs = [
    {
        icon: BookOpen,
        title: "Senior School – CBC",
        grades: "Grade 10 – 12",
        description: "Aligned with Kenya's Competency Based Curriculum (CBC), offering pathways in Sciences, Humanities, and Arts & Sports Science with continuous assessment and project-based learning.",
    },
    {
        icon: Microscope,
        title: "Senior School – 8-4-4",
        grades: "Form 3 – 4",
        description: "Rigorous KCSE preparation across all subject clusters — Sciences, Humanities, Technical, and Languages — with experienced teachers and regular mock examinations.",
    },
];

const subjects = [
    { category: "Sciences", list: "Mathematics, Biology, Chemistry, Physics, Computer Studies" },
    { category: "Humanities", list: "History & Government, Geography, CRE/IRE, Business Studies" },
    { category: "Languages", list: "English, Kiswahili, French, German" },
    { category: "Technical & Applied", list: "Agriculture, Home Science, Art & Design, Music" },
];

const faculty = [
    { name: "Mr. John Kamau", subject: "Mathematics", credential: "B.Ed. Kenyatta University" },
    { name: "Mrs. Esther Njeri", subject: "Biology & Chemistry", credential: "B.Sc. University of Nairobi" },
    { name: "Mr. David Omondi", subject: "History & CRE", credential: "B.Ed. Moi University" },
    { name: "Ms. Lydia Achieng", subject: "English & Literature", credential: "M.A. Maseno University" },
];

const Academics = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80"
                            alt="Academics at Drumvale"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Academics</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Excellence in Education</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">
                            Our senior school curriculum prepares students for KCSE and beyond, with dedicated teachers and a culture of academic discipline.
                        </p>
                    </div>
                </section>

                {/* Teaching Philosophy */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Our Approach</p>
                            <h2 className="heading-lg text-foreground mb-4">Student-Centred, Results-Driven</h2>
                            <p className="text-body text-muted-foreground mb-4">
                                At Drumvale, we believe great education combines academic rigour with practical skills. Our teachers use a mix of classroom instruction, group work, and continuous assessment to ensure every student reaches their potential.
                            </p>
                            <p className="text-body text-muted-foreground">
                                With a low teacher-to-student ratio, personalized attention is at the heart of everything we do. Regular remedial classes, mentorship, and career guidance support students throughout their secondary school journey.
                            </p>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
                                alt="Students in class at Drumvale"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                {/* Programs */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Programs</p>
                            <h2 className="heading-lg text-foreground">Senior School Curriculum Pathways</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {programs.map((prog) => (
                                <div key={prog.title} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow group">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                        <prog.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <span className="inline-block bg-accent text-accent-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3">{prog.grades}</span>
                                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{prog.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{prog.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subjects */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Subjects</p>
                            <h2 className="heading-lg text-foreground">What We Teach</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {subjects.map((s) => (
                                <div key={s.category} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                    <h3 className="font-heading font-semibold mb-3 text-accent">{s.category}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{s.list}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Faculty */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Faculty</p>
                            <h2 className="heading-lg text-foreground">Expert Educators</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {faculty.map((f) => (
                                <div key={f.name} className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-primary-foreground font-heading font-bold text-xl">{f.name.charAt(0)}</span>
                                    </div>
                                    <h4 className="font-heading font-semibold text-foreground">{f.name}</h4>
                                    <p className="text-accent text-sm font-heading">{f.subject}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{f.credential}</p>
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

export default Academics;
