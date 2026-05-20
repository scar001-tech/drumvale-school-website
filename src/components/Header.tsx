import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Calendar, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Academics", to: "/academics" },
    { label: "Admissions", to: "/admissions" },
    { label: "Student Life", to: "/student-life" },
    { label: "Athletics", to: "/athletics" },
    { label: "News & Events", to: "/news-events" },
    { label: "Alumni", to: "/alumni" },
    { label: "Contact", to: "/contact" },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    return (
        <header className="w-full z-50 fixed top-0 left-0">
            {/* Utility Bar */}
            <div className="bg-primary text-primary-foreground text-xs hidden md:block">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1.5">
                    <div className="flex items-center gap-4">
                        <Link to="/portal/staff" className="hover:text-accent transition-colors">Staff Portal</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-accent transition-colors flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Calendar
                        </a>
                        <span className="opacity-30">|</span>
                        <button className="hover:text-accent transition-colors"><Search className="w-3 h-3" /></button>
                        <div className="flex items-center gap-2 ml-2">
                            <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <nav className={`transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-card/80 backdrop-blur-sm"}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-heading font-bold text-lg">D</span>
                        </div>
                        <div className="leading-tight">
                            <span className="font-heading font-bold text-primary text-sm md:text-base block">Drumvale</span>
                            <span className="text-[10px] md:text-xs text-muted-foreground tracking-wider uppercase">Secondary School</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-accent hover:bg-muted ${location.pathname === link.to ? "text-accent" : "text-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <Link to="/admissions">
                            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-heading text-xs">
                                Schedule Visit
                            </Button>
                        </Link>
                        <Link to="/admissions">
                            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading text-xs">
                                Apply Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileOpen && (
                    <div className="lg:hidden bg-card border-t border-border animate-fade-in">
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${location.pathname === link.to ? "bg-muted text-accent" : "text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex gap-2 mt-4">
                                <Link to="/admissions" className="flex-1">
                                    <Button variant="outline" className="w-full border-accent text-accent font-heading text-sm">Schedule Visit</Button>
                                </Link>
                                <Link to="/admissions" className="flex-1">
                                    <Button className="w-full bg-accent text-accent-foreground font-heading text-sm">Apply Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
