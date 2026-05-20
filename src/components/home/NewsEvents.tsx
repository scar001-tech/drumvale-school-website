import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

const newsItems = [
    {
        date: "April 20, 2026",
        category: "Academics",
        title: "Drumvale Students Excel in KCSE Mock Examinations",
        excerpt: "Form 4 students recorded an impressive mean score of 9.4 in the inter-school mock exams, ranking among the top schools in the county.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    },
    {
        date: "April 10, 2026",
        category: "Athletics",
        title: "Eagles Win County Football Championship",
        excerpt: "The Drumvale Eagles football team clinched the county title with a 3-1 victory in the final, qualifying for the national schools games.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    },
    {
        date: "March 28, 2026",
        category: "Community",
        title: "Annual Prize Giving Day Celebrates Student Achievements",
        excerpt: "Parents, teachers, and students gathered for the annual prize giving ceremony honouring top performers across all subjects and co-curricular activities.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    },
];

const events = [
    { date: "May 3", title: "Inter-House Athletics Day", time: "8:00 AM" },
    { date: "May 17", title: "Form 3 & Grade 11 Mid-Term Exams Begin", time: "7:30 AM" },
    { date: "Jun 6", title: "Parents' Open Day", time: "9:00 AM" },
];

const NewsEvents = () => {
    return (
        <section className="section-padding bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Stay Updated</p>
                    <h2 className="heading-lg text-foreground">News & Events</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {newsItems.map((item) => (
                        <article
                            key={item.title}
                            className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-heading font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">{item.category}</span>
                                    <span className="text-xs text-muted-foreground">{item.date}</span>
                                </div>
                                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-accent" /> Upcoming Events
                        </h3>
                        <Link to="/news-events" className="text-accent font-heading text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {events.map((event) => (
                            <div key={event.title} className="flex items-center gap-4 py-3">
                                <div className="bg-accent/10 rounded-lg px-3 py-2 text-center min-w-[60px]">
                                    <span className="text-accent font-heading font-bold text-sm">{event.date}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground text-sm">{event.title}</p>
                                    <p className="text-xs text-muted-foreground">{event.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsEvents;
