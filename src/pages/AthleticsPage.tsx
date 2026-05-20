import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Calendar } from "lucide-react";

const sports = [
    { name: "Football", season: "Term 1", achievements: "County Champions 2024", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80" },
    { name: "Basketball", season: "Term 1 & 2", achievements: "Regional Semifinalists 2025", image: "https://images.unsplash.com/photo-1546519638405-a9f9e8f7e7e7?w=600&q=80" },
    { name: "Track & Field", season: "Term 2 & 3", achievements: "5x County Champions", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80" },
    { name: "Rugby", season: "Term 1", achievements: "National Schools Games 2024", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80" },
    { name: "Netball", season: "Term 2", achievements: "Zone Champions 2025", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80" },
    { name: "Cross Country", season: "Term 1", achievements: "Top 3 Nationally 2024", image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80" },
];

const AthleticsPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600&q=80"
                            alt="Athletics at Drumvale"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Athletics</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Drumvale Eagles</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">
                            Excellence on the field, court, and track. Our athletics programme develops champions with character.
                        </p>
                    </div>
                </section>

                {/* Overview */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Our Programme</p>
                            <h2 className="heading-lg text-foreground mb-4">Building Champions</h2>
                            <p className="text-body text-muted-foreground mb-4">
                                The Drumvale Eagles athletics programme emphasises sportsmanship, teamwork, and personal excellence. With well-maintained facilities and experienced coaches, our student-athletes compete at county, regional, and national levels.
                            </p>
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="text-center">
                                    <p className="text-3xl font-heading font-bold text-accent">6</p>
                                    <p className="text-xs text-muted-foreground">Sports Teams</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-heading font-bold text-accent">20+</p>
                                    <p className="text-xs text-muted-foreground">Championships</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-heading font-bold text-accent">90%</p>
                                    <p className="text-xs text-muted-foreground">Scholar Athletes</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80"
                                alt="Athletics at Drumvale"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                {/* Sports Grid */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Sports Teams</p>
                            <h2 className="heading-lg text-foreground">Our Programmes</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sports.map((sport) => (
                                <div key={sport.name} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group">
                                    <div className="h-44 overflow-hidden">
                                        <img
                                            src={sport.image}
                                            alt={sport.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-heading font-bold text-lg text-foreground mb-1">{sport.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <Calendar className="w-3.5 h-3.5 text-accent" /> {sport.season}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-accent font-heading font-semibold">
                                            <Trophy className="w-3.5 h-3.5" /> {sport.achievements}
                                        </div>
                                    </div>
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

export default AthleticsPage;
