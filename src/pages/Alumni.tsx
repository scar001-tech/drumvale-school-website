import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, BookOpen, Heart } from "lucide-react";

const notableAlumni = [
    { name: "Hon. James Mwangi", year: "Class of 1998", role: "Member of Parliament, Nairobi County", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { name: "Dr. Amina Odhiambo", year: "Class of 2003", role: "Consultant Physician, Kenyatta National Hospital", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
    { name: "Mr. Brian Kipchoge", year: "Class of 2007", role: "Entrepreneur & Tech Founder, Nairobi", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
    { name: "Ms. Cynthia Auma", year: "Class of 2010", role: "Senior Engineer, Kenya Power", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
];

const Alumni = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
                            alt="Drumvale Alumni"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Alumni</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Our Alumni Network</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">
                            Thousands of Drumvale graduates are making a difference across Kenya and beyond — in medicine, business, public service, and the arts.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {[
                                { stat: "5,000+", label: "Alumni Nationwide", icon: Users },
                                { stat: "40+", label: "Years of Graduates", icon: BookOpen },
                                { stat: "95%", label: "University Placement", icon: Heart },
                            ].map((item) => (
                                <div key={item.label} className="text-center bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                                    <item.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                                    <p className="text-4xl font-heading font-bold text-accent mb-2">{item.stat}</p>
                                    <p className="text-muted-foreground font-heading">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Notable Alumni */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Notable Alumni</p>
                            <h2 className="heading-lg text-foreground">Drumvale Graduates Making an Impact</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {notableAlumni.map((alum) => (
                                <div key={alum.name} className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-accent/30">
                                        <img src={alum.image} alt={alum.name} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                    <h4 className="font-heading font-semibold text-foreground">{alum.name}</h4>
                                    <p className="text-accent text-xs font-heading mb-1">{alum.year}</p>
                                    <p className="text-xs text-muted-foreground">{alum.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stay Connected */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80"
                                alt="Alumni reunion"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Stay Connected</p>
                            <h2 className="heading-lg text-foreground mb-4">Always a Drumvale Eagle</h2>
                            <p className="text-body text-muted-foreground mb-4">
                                Our alumni association provides mentorship opportunities, career connections, and lifelong friendships. Join us at annual reunions, networking events, and school fundraising initiatives.
                            </p>
                            <p className="text-body text-muted-foreground">
                                Whether you graduated last year or decades ago, you are always part of the Drumvale family. Reach out to the alumni office to reconnect and give back to the next generation.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Alumni;
