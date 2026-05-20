import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Music, Heart, Star, Palette, Rocket } from "lucide-react";

const activities = [
    { icon: Users, title: "Clubs & Societies", description: "From Debate Club to Science Club, explore over 20 student-led organizations that build skills and friendships." },
    { icon: Music, title: "Creative Arts", description: "Excellence in music, drama, and visual arts with dedicated facilities and experienced instructors." },
    { icon: Heart, title: "Community Service", description: "Making a difference through local outreach, environmental projects, and charity drives." },
    { icon: Star, title: "Student Leadership", description: "Developing responsibility and character through the Student Council and prefect system." },
    { icon: Palette, title: "Culture & Diversity", description: "Celebrating Kenyan culture and heritage through annual cultural days, music festivals, and traditional events." },
    { icon: Rocket, title: "STEM & Innovation", description: "Science fairs, coding clubs, and innovation challenges that prepare students for a technology-driven future." },
];

const StudentLife = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80"
                            alt="Student life at Drumvale"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Campus Experience</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Vibrant Student Life</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">
                            Education at Drumvale extends far beyond the classroom. Discover a world of opportunity, passion, and friendship.
                        </p>
                    </div>
                </section>

                {/* Overview */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                                alt="Students on campus"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">The Drumvale Experience</p>
                            <h2 className="heading-lg text-foreground mb-4">A Community Like No Other</h2>
                            <p className="text-body text-muted-foreground mb-4">
                                At Drumvale, we cultivate an environment where every student can find their niche, develop their talents, and build lifelong connections with peers and mentors.
                            </p>
                            <p className="text-body text-muted-foreground">
                                Our boarding and day school community fosters discipline, teamwork, and a strong sense of belonging — values that stay with our students long after they leave school.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Activities */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Explore</p>
                            <h2 className="heading-lg text-foreground">Extracurricular Programs</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities.map((act) => (
                                <div key={act.title} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow group">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                        <act.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{act.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{act.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery strip */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="heading-lg text-foreground">Life on Campus</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
                                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80",
                                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
                                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
                            ].map((src, i) => (
                                <div key={i} className="rounded-xl overflow-hidden aspect-square">
                                    <img src={src} alt={`Campus life ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
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

export default StudentLife;
