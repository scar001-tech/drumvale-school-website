import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import studentsCampus from "@/assets/students-campus.svg";

const AboutSection = () => {
    return (
        <section className="section-padding bg-muted">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <img
                            src={studentsCampus}
                            alt="Students on Drumvale campus"
                            className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground font-heading font-bold rounded-xl px-6 py-3 shadow-lg text-sm md:text-base">
                            Est. 1985 • 40 Years
                        </div>
                    </div>

                    <div>
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">About Drumvale</p>
                        <h2 className="heading-lg text-foreground mb-4">
                            A Legacy of Excellence in Education
                        </h2>
                        <p className="text-body text-muted-foreground mb-6">
                            For over four decades, Drumvale Secondary School has been at the forefront of quality education in Kenya, nurturing young minds to become disciplined, innovative, and responsible citizens.
                        </p>

                        <div className="space-y-3 mb-8">
                            {[
                                "Consistently top-ranked KCSE school in the county",
                                "Senior school for Grade 10–12 and Form 3–4 students",
                                "Experienced and dedicated teaching staff",
                                "Strong co-curricular and sports programmes",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/about">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                                Learn More About Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
