import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Users, Heart, Star } from "lucide-react";
import studentsCampus from "@/assets/students-campus.svg";

const activities = [
    { icon: Users, label: "50+ Clubs & Societies" },
    { icon: Music, label: "Arts & Performing Arts" },
    { icon: Heart, label: "Community Service" },
    { icon: Star, label: "Leadership Programs" },
];

const CampusLifeBanner = () => {
    return (
        <section className="relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${studentsCampus})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-secondary/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto section-padding">
                <div className="max-w-2xl">
                    <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Campus Life</p>
                    <h2 className="heading-lg text-primary-foreground mb-4">
                        Life Beyond the Classroom
                    </h2>
                    <p className="text-primary-foreground/80 text-body mb-8">
                        At Drumvale, education extends far beyond academics. Our vibrant campus life offers endless opportunities for growth, creativity, and connection.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {activities.map((item) => (
                            <div key={item.label} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-3">
                                <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                                <span className="text-primary-foreground text-sm font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/student-life">
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading">
                            Explore Student Life
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CampusLifeBanner;
