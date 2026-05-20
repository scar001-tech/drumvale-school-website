import { Award, BookOpen, Building2, Palette } from "lucide-react";

const highlights = [
    {
        icon: Award,
        title: "Academic Excellence",
        description: "Rigorous KCSE curriculum with consistently high mean scores and top university placements nationally.",
    },
    {
        icon: BookOpen,
        title: "Senior School Focus",
        description: "Dedicated programmes for Grade 10–12 and Form 3–4 students with expert subject teachers.",
    },
    {
        icon: Building2,
        title: "Modern Facilities",
        description: "Well-equipped science labs, computer rooms, library, sports fields, and creative studios.",
    },
    {
        icon: Palette,
        title: "Extracurricular Excellence",
        description: "Clubs, sports teams, drama, music, and community service shaping well-rounded students.",
    },
];

const QuickHighlights = () => {
    return (
        <section className="section-padding bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, i) => (
                        <div
                            key={item.title}
                            className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                <item.icon className="w-7 h-7 text-accent" />
                            </div>
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickHighlights;
