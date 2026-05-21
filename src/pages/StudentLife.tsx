import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Music, Heart, Star, Palette, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const activities = [
    { icon: Users, title: "Clubs & Societies", description: "From Debate Club to Science Club, explore over 20 student-led organizations that build skills and friendships." },
    { icon: Music, title: "Creative Arts", description: "Excellence in music, drama, and visual arts with dedicated facilities and experienced instructors." },
    { icon: Heart, title: "Community Service", description: "Making a difference through local outreach, environmental projects, and charity drives." },
    { icon: Star, title: "Student Leadership", description: "Developing responsibility and character through the Student Council and prefect system." },
    { icon: Palette, title: "Culture & Diversity", description: "Celebrating Kenyan culture and heritage through annual cultural days, music festivals, and traditional events." },
    { icon: Rocket, title: "STEM & Innovation", description: "Science fairs, coding clubs, and innovation challenges that prepare students for a technology-driven future." },
];

const clubItems = [
    {
        title: "Robotics & AI Club",
        description: "Designing, building, and programming intelligent robots for local and international STEM challenges.",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80",
        blogUrl: "/news-events?post=robotics-championship",
        tag: "STEM"
    },
    {
        title: "Debate & Public Speaking",
        description: "Fostering critical thinking, research skills, and eloquence through public debate competitions.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
        blogUrl: "/news-events?post=debate-finals",
        tag: "Academic"
    },
    {
        title: "Music, Dance & Drama",
        description: "Expressing creativity through choirs, band ensembles, traditional dance, and original school plays.",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
        blogUrl: "/news-events?post=annual-music-festival",
        tag: "Creative Arts"
    },
    {
        title: "Coding & Web Innovation",
        description: "Learning modern programming languages, web development, and hacking solutions for community needs.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
        blogUrl: "/news-events?post=drumvale-hackathon",
        tag: "Innovation"
    },
    {
        title: "Art & Graphic Design",
        description: "Exploring visual mediums from painting and sculpture to digital illustration and branding.",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
        blogUrl: "/news-events?post=art-exhibition",
        tag: "Fine Arts"
    }
];

const galleryItems = [
    {
        title: "Professional Running Track",
        category: "Sports Facility",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&q=80",
        description: "Our WASC-compliant running track supporting our athletic superstars."
    },
    {
        title: "Eagles Football Team Practice",
        category: "Students in Action",
        image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=600&q=80",
        description: "Students training for the upcoming county championships."
    },
    {
        title: "Junior Soccer Academy",
        category: "Sports & Fitness",
        image: "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?w=600&q=80",
        description: "Developing teamwork and physical fitness from an early age."
    },
    {
        title: "Collaborative Library Studies",
        category: "General School Life",
        image: "https://images.unsplash.com/photo-1529007196863-d07650a3f0ea?w=600&q=80",
        description: "Academic success is built on shared knowledge and student collaboration."
    },
    {
        title: "Interactive STEM Classrooms",
        category: "General School Life",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80",
        description: "Engaging discussions led by experienced and certified instructors."
    },
    {
        title: "Campus Social Gardens",
        category: "Campus Life",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
        description: "Beautiful, lush green grounds for recreation and student socialization."
    }
];

const StudentLife = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80"
                            alt="Student life at Drumvale"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Campus Experience</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Vibrant Student Life</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">
                            Education at Drumvale extends far beyond the classroom. Discover a world of opportunity, passion, and friendship.
                        </p>
                    </div>
                </section>

                {/* Overview */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                           <img
                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                                alt="Students on campus"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">The Drumvale Experience</p>
                            <h2 className="heading-lg text-foreground mb-4">A Community Like No Other</h2>
                            <p className="text-body text-muted-foreground mb-4">
                                At Drumvale, we cultivate an environment where every student can find their niche, develop their talents, and build lifelong connections with peers and mentors.
                            </p>
                            <p className="text-body text-muted-foreground">
                                Our boarding and day school community fosters discipline, teamwork, and a strong sense of belonging — values that stay with our students long after they leave school.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Activities */}
                <section className="section-padding bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Explore</p>
                            <h2 className="heading-lg text-foreground">Extracurricular Programs</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities.map((act) => (
                                <div key={act.title} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow group">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                        <act.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{act.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{act.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Clubs Carousel */}
                        <div className="mt-20">
                            <div className="text-center mb-12">
                                <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Clubs Showcase</p>
                                <h2 className="heading-lg text-foreground">Student Clubs in Action</h2>
                                <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">Click on any club to read their student blogs and recent projects.</p>
                            </div>
                            <div className="relative px-12 md:px-16 max-w-5xl mx-auto">
                                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                                    <CarouselContent className="-ml-4">
                                        {clubItems.map((club, index) => (
                                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                                <Link to={club.blogUrl} className="group flex flex-col h-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img src={club.image} alt={club.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-md">{club.tag}</span>
                                                    </div>
                                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{club.title}</h3>
                                                            <p className="text-sm text-muted-foreground leading-relaxed">{club.description}</p>
                                                        </div>
                                                        <div className="mt-4 flex items-center text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                                                            Read Club Blog &rarr;
                                                        </div>
                                                    </div>
                                                </Link>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 ml-2" />
                                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Campus Gallery</p>
                            <h2 className="heading-lg text-foreground">Sports Facilities & Campus Life</h2>
                            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">Take a tour of our modern athletic amenities and the everyday experiences of our vibrant student body.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleryItems.map((item, i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group">
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded">{item.category}</span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-heading font-semibold text-base text-foreground mb-1">{item.title}</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
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

export default StudentLife;
