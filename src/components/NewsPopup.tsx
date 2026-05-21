import { useState, useEffect } from "react";
import { X, CalendarDays, Bell, MapPin, Clock, ArrowRight, Newspaper } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NewsPopupProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: "news" | "events" | "calendar";
}

const newsData = [
    {
        category: "Academics",
        date: "Apr 20, 2026",
        title: "Form 4 Students Record Impressive KCSE Mock Results",
        excerpt: "Drumvale's Form 4 class achieved a mean score of 9.4 in the inter-school mock examinations, placing the school among top performers.",
        link: "/news-events"
    },
    {
        category: "Athletics",
        date: "Apr 10, 2026",
        title: "Eagles Win County Football Championship",
        excerpt: "The Drumvale Eagles football team clinched the county title with a 3-1 victory in the final, earning a place at nationals in Eldoret.",
        link: "/news-events"
    },
    {
        category: "Arts",
        date: "Mar 15, 2026",
        title: "Drama Club Wins Regional Schools Festival",
        excerpt: "Drumvale's drama club took first place at the regional Kenya Schools Drama Festival with their original production, advancing to nationals.",
        link: "/news-events"
    }
];

const eventsData = [
    { date: "May 3, 2026", dateStr: "2026-05-03", title: "Inter-House Athletics Day", time: "8:00 AM – 4:00 PM", location: "School Grounds" },
    { date: "May 17, 2026", dateStr: "2026-05-17", title: "Form 3 & Grade 11 Mid-Term Exams Begin", time: "7:30 AM", location: "Examination Halls" },
    { date: "Jun 6, 2026", dateStr: "2026-06-06", title: "Parents' Open Day", time: "9:00 AM – 1:00 PM", location: "Main Hall" },
    { date: "Jun 20, 2026", dateStr: "2026-06-20", title: "End of Term 2 Closing Ceremony", time: "10:00 AM", location: "Assembly Ground" },
    { date: "Jul 14, 2026", dateStr: "2026-07-14", title: "Term 3 Opening Day", time: "7:00 AM", location: "School Campus" }
];

const eventDatesMap: Record<string, { title: string; time: string; location: string }> = {
    "2026-05-03": { title: "Inter-House Athletics Day", time: "8:00 AM – 4:00 PM", location: "School Grounds" },
    "2026-05-17": { title: "Form 3 & Grade 11 Mid-Term Exams Begin", time: "7:30 AM", location: "Examination Halls" },
    "2026-06-06": { title: "Parents' Open Day", time: "9:00 AM – 1:00 PM", location: "Main Hall" },
    "2026-06-20": { title: "End of Term 2 Closing Ceremony", time: "10:00 AM", location: "Assembly Ground" },
    "2026-07-14": { title: "Term 3 Opening Day", time: "7:00 AM", location: "School Campus" }
};

const highlightDates = [
    new Date(2026, 4, 3), // May 3
    new Date(2026, 4, 17), // May 17
    new Date(2026, 5, 6), // Jun 6
    new Date(2026, 5, 20), // Jun 20
    new Date(2026, 6, 14), // Jul 14
];

const NewsPopup = ({ isOpen, onClose, initialTab = "news" }: NewsPopupProps) => {
    const [activeTab, setActiveTab] = useState<"news" | "events" | "calendar">(initialTab);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 4, 3)); // May 3rd, 2026

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    const formatDateKey = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const activeDateKey = selectedDate ? formatDateKey(selectedDate) : "";
    const selectedEvent = activeDateKey ? eventDatesMap[activeDateKey] : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-accent animate-bounce" />
                        <h2 className="font-heading font-semibold text-lg">Live Campus Updates</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs Selector */}
                <div className="flex border-b border-border bg-slate-50">
                    <button
                        onClick={() => setActiveTab("news")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                            activeTab === "news"
                                ? "border-accent text-accent bg-white font-semibold"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-slate-100/50"
                        }`}
                    >
                        <Newspaper className="w-4 h-4" /> News Feed
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                            activeTab === "events"
                                ? "border-accent text-accent bg-white font-semibold"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-slate-100/50"
                        }`}
                    >
                        <CalendarDays className="w-4 h-4" /> Events
                    </button>
                    <button
                        onClick={() => setActiveTab("calendar")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                            activeTab === "calendar"
                                ? "border-accent text-accent bg-white font-semibold"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-slate-100/50"
                        }`}
                    >
                        <CalendarDays className="w-4 h-4" /> Calendar
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {activeTab === "news" && (
                        <div className="space-y-4">
                            {newsData.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.link}
                                    onClick={onClose}
                                    className="block p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-heading font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{item.date}</span>
                                    </div>
                                    <h3 className="font-heading font-semibold text-sm text-foreground mb-1 group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                        {item.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}

                    {activeTab === "events" && (
                        <div className="space-y-3">
                            {eventsData.map((event, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/70 transition-colors"
                                >
                                    <div className="bg-accent/10 rounded-lg px-3 py-2 text-center min-w-[60px] text-accent">
                                        <span className="font-heading font-bold text-base block leading-none">
                                            {event.date.split(" ")[0]}
                                        </span>
                                        <span className="text-[10px] font-heading font-semibold tracking-widest uppercase">
                                            {event.date.split(" ")[1].replace(",", "")}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-heading font-semibold text-sm text-foreground leading-tight">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                                            <span className="flex items-center gap-0.5"><Clock className="w-3.5 h-3.5 text-accent" /> {event.time}</span>
                                            <span className="flex items-center gap-0.5"><MapPin className="w-3.5 h-3.5 text-accent" /> {event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "calendar" && (
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                            <div className="border border-border bg-white rounded-xl shadow-sm p-2 flex justify-center">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md"
                                    modifiers={{
                                        hasEvent: highlightDates
                                    }}
                                    modifiersStyles={{
                                        hasEvent: {
                                            fontWeight: "bold",
                                            backgroundColor: "rgba(224, 86, 36, 0.15)",
                                            color: "rgb(224, 86, 36)",
                                            borderRadius: "8px",
                                            border: "2px dashed rgb(224, 86, 36)"
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex-1 w-full flex flex-col justify-between self-stretch bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <div>
                                    <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-accent mb-2">
                                        Events for Selected Date
                                    </h4>
                                    {selectedEvent ? (
                                        <div className="space-y-3">
                                            <h3 className="font-heading font-semibold text-base text-foreground">
                                                {selectedEvent.title}
                                            </h3>
                                            <div className="space-y-1.5 text-xs text-muted-foreground">
                                                <p className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-accent" /> {selectedEvent.time}
                                                </p>
                                                <p className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-accent" /> {selectedEvent.location}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-muted-foreground italic">
                                            No events scheduled for this day. Try clicking on highlighted dates (e.g. May 3, May 17, June 6, June 20).
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    <p className="text-[10px] text-muted-foreground">
                                        * Dates with dashed orange borders indicate scheduled events. Click on them to view details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with global link */}
                <div className="px-6 py-4 border-t border-border bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Drumvale Academic Year 2026</span>
                    <Link
                        to="/news-events"
                        onClick={onClose}
                        className="inline-flex items-center text-xs font-bold text-accent hover:text-accent/80 hover:translate-x-0.5 transition-all"
                    >
                        View Full News & Events <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsPopup;
