import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalendarDays, ArrowRight } from "lucide-react";

const news = [
    {
        date: "April 20, 2026", category: "Academics",
        title: "Form 4 Students Record Impressive KCSE Mock Results",
        excerpt: "Drumvale's Form 4 class achieved a mean score of 9.4 in the inter-school mock examinations, placing the school among the top performers in the county.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    },
    {
        date: "April 10, 2026", category: "Athletics",
        title: "Eagles Win County Football Championship",
        excerpt: "The Drumvale Eagles football team clinched the county title with a 3-1 victory in the final, earning a place at the national schools games in Eldoret.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    },
    {
        date: "March 28, 2026", category: "Community",
        title: "Annual Prize Giving Day Celebrates Student Achievements",
        excerpt: "Parents, teachers, and students gathered for the annual prize giving ceremony honouring top performers across all subjects and co-curricular activities.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    },
    {
        date: "March 15, 2026", category: "Arts",
        title: "Drama Club Wins Regional Schools Festival",
        excerpt: "Drumvale's drama club took first place at the regional Kenya Schools Drama Festival with their original production, advancing to the national stage.",
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80",
    },
    {
        date: "February 28, 2026", category: "Academics",
        title: "New Science Laboratory Officially Opened",
        excerpt: "The school's newly renovated science laboratory was officially opened, featuring modern equipment for Biology, Chemistry, and Physics practicals.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
    },
    {
        date: "February 10, 2026", category: "Alumni",
        title: "Alumni Association Donates Library Books",
        excerpt: "The Drumvale Alumni Association donated over 500 books to the school library, boosting resources for Form 3, Form 4, and senior school students.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    },
];

const events = [
    { date: "May 3", title: "Inter-House Athletics Day", time: "8:00 AM – 4:00 PM", location: "School Grounds" },
    { date: "May 17", title: "Form 3 & Grade 11 Mid-Term Exams Begin", time: "7:30 AM", location: "Examination Halls" },
    { date: "Jun 6", title: "Parents' Open Day", time: "9:00 AM – 1:00 PM", location: "Main Hall" },
    { date: "Jun 20", title: "End of Term 2 Closing Ceremony", time: "10:00 AM", location: "Assembly Ground" },
    { date: "Jul 14", title: "Term 3 Opening Day", time: "7:00 AM", location: "School Campus" },
];

const NewsEventsPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
                            alt="News and Events at Drumvale"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">News & Events</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Stay Connected</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">The latest stories, achievements, and happenings from the Drumvale community.</p>
                    </div>
                </section>

                {/* News */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="heading-lg text-foreground mb-8">Latest News</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item) => (
                                <article key={item.title} className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group">
                                    <div className="h-44 overflow-hidden">
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
                    </div>
                </section>

                {/* Events */}
                <section className="section-padding bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="heading-lg text-foreground mb-8 flex items-center gap-2">
                            <CalendarDays className="w-8 h-8 text-accent" /> Upcoming Events
                        </h2>
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex items-center gap-5 hover:shadow-lg transition-shadow">
                                    <div className="bg-accent/10 rounded-lg px-4 py-3 text-center min-w-[70px]">
                                        <span className="text-accent font-heading font-bold text-lg block">{event.date.split(" ")[0]}</span>
                                        <span className="text-accent font-heading text-sm">{event.date.split(" ")[1]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-heading font-semibold text-foreground">{event.title}</h3>
                                        <p className="text-xs text-muted-foreground">{event.time} • {event.location}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-accent flex-shrink-0" />
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

export default NewsEventsPage;
