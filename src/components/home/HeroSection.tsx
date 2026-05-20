import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
                    alt="Drumvale Secondary School campus"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/75 to-primary/45" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <p className="text-accent font-heading font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    Welcome to Drumvale Secondary School
                </p>
                <h1 className="heading-xl text-primary-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    Nurturing Excellence,
                    <br />
                    <span className="text-accent">Building Character</span>
                </h1>
                <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    A premier Kenyan secondary school committed to academic excellence, discipline, and the holistic development of every student.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                    <Link to="/academics">
                        <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 font-heading px-8 text-base shadow-lg">
                            Explore Academics
                        </Button>
                    </Link>
                    <Link to="/admissions">
                        <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 font-heading px-8 text-base shadow-lg">
                            Apply Now
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
                    <div className="w-1.5 h-3 bg-accent rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
