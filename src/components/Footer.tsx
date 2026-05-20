import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Logo & About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                <span className="text-accent-foreground font-heading font-bold text-lg">D</span>
                            </div>
                            <div>
                                <span className="font-heading font-bold text-base block">Drumvale</span>
                                <span className="text-xs opacity-70 tracking-wider uppercase">Secondary School</span>
                            </div>
                        </div>
                        <p className="text-sm opacity-80 leading-relaxed mb-4">
                            Preparing global leaders for tomorrow through academic excellence, character development, and a vibrant community.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-accent mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { label: "About Us", to: "/about" },
                                { label: "Academics", to: "/academics" },
                                { label: "Student Life", to: "/student-life" },
                                { label: "Athletics", to: "/athletics" },
                                { label: "News & Events", to: "/news-events" },
                                { label: "Contact", to: "/contact" },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admissions */}
                    <div>
                        <h4 className="font-heading font-semibold text-accent mb-4">Admissions</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                "How to Apply",
                                "Tuition & Fees",
                                "Financial Aid",
                                "Visit Campus",
                                "Download Prospectus",
                                "FAQs",
                            ].map((item) => (
                                <li key={item}>
                                    <Link to="/admissions" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold text-accent mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                                <span className="opacity-80">123 Academic Drive, Drumvale City, International District</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                                <span className="opacity-80">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                                <span className="opacity-80">admissions@drumvale.edu</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-secondary">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-70">
                    <p>&copy; 2026 Drumvale Secondary School. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-accent">Privacy Policy</a>
                        <a href="#" className="hover:text-accent">Terms of Use</a>
                        <a href="#" className="hover:text-accent">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
