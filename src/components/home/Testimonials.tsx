import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Drumvale transformed my daughter's perspective on education. She's now thriving at Oxford, and we credit the incredible faculty and supportive community here.",
        name: "Dr. Sarah Chen",
        role: "Parent, Class of 2024",
    },
    {
        quote: "The international programs at Drumvale gave me the confidence and skills to pursue my dream of studying medicine. The teachers truly care about every student.",
        name: "James Okonkwo",
        role: "Alumnus, Class of 2023",
    },
    {
        quote: "As an educator, I've never seen a school so dedicated to holistic development. Drumvale's commitment to academic and personal growth is unmatched.",
        name: "Prof. Maria Gonzalez",
        role: "Former Faculty Member",
    },
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((c) => (c + 1) % testimonials.length);
    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="section-padding bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Testimonials</p>
                <h2 className="heading-lg text-foreground mb-10">What Our Community Says</h2>

                <div className="relative">
                    <Quote className="w-12 h-12 text-accent/20 mx-auto mb-6" />

                    <blockquote className="text-xl md:text-2xl text-foreground font-heading font-medium leading-relaxed mb-6 min-h-[120px]">
                        "{testimonials[current].quote}"
                    </blockquote>

                    <p className="font-heading font-semibold text-foreground">{testimonials[current].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                        </button>
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-foreground" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
