import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const sports = [
    {
        name: "Basketball",
        season: "Term 1 & 2",
        image: "https://images.unsplash.com/photo-1546519638405-a9f9e8f7e7e7?w=600&q=80",
    },
    {
        name: "Football",
        season: "Term 1",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    },
    {
        name: "Track & Field",
        season: "Term 2 & 3",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80",
    },
    {
        name: "Rugby",
        season: "Term 1",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80",
    },
];

const AthleticsSlider = () => {
    return (
        <section className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
                    <div>
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Athletics</p>
                        <h2 className="heading-lg text-foreground">Champions On & Off the Field</h2>
                    </div>
                    <Link
                        to="/athletics"
                        className="inline-flex items-center gap-1 text-accent font-heading font-semibold text-sm mt-4 md:mt-0 hover:gap-2 transition-all"
                    >
                        View All Sports <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sports.map((sport) => (
                        <div
                            key={sport.name}
                            className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
                        >
                            <img
                                src={sport.image}
                                alt={sport.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <p className="text-accent text-xs font-heading tracking-wider uppercase">{sport.season}</p>
                                <h3 className="text-primary-foreground font-heading font-bold text-xl">{sport.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AthleticsSlider;
