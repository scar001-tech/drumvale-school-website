import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const programs = [
    {
        title: "Senior Secondary",
        grades: "Grade 10 – 12",
        description: "Advanced coursework aligned with the CBC Senior School curriculum, with specialization in Sciences, Humanities, and Arts & Sports Science.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    },
    {
        title: "Senior Secondary",
        grades: "Form 3 – 4",
        description: "Rigorous KCSE preparation with focused subject teaching, continuous assessment, and mock examinations to ensure top national results.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
    },
];

const AcademicPrograms = () => {
    return (
        <section className="section-padding bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Our Programs</p>
                    <h2 className="heading-lg text-foreground mb-4">Academic Programs</h2>
                    <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                        Our curriculum is designed to challenge and inspire senior school students, preparing them for KCSE and university admission.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {programs.map((program) => (
                        <div
                            key={program.grades}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="h-52 overflow-hidden relative">
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                                <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
                                    {program.grades}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{program.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{program.description}</p>
                                <Link
                                    to="/academics"
                                    className="inline-flex items-center gap-1 text-accent font-heading font-semibold text-sm hover:gap-2 transition-all"
                                >
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicPrograms;
