import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTABanner = () => {
    return (
        <section className="relative section-padding overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
                    alt="Drumvale campus"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-secondary/90" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="heading-lg text-primary-foreground mb-4">
                    Join the Drumvale Community
                </h2>
                <p className="text-primary-foreground/85 text-body max-w-xl mx-auto mb-8">
                    Begin your journey toward academic excellence and personal growth. Applications are now open for the 2026–2027 academic year.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/admissions">
                        <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 font-heading px-8 text-base shadow-lg">
                            Apply Now
                        </Button>
                    </Link>
                    <Link to="/admissions">
                        <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 font-heading px-8 text-base shadow-lg">
                            Book a Visit
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
