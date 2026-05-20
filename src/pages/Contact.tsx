import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent! We'll respond within 24 hours.");
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
                            alt="Drumvale Secondary School"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-2">Contact</p>
                        <h1 className="heading-xl text-primary-foreground mb-4">Get in Touch</h1>
                        <p className="text-primary-foreground/85 text-body max-w-2xl mx-auto">We'd love to hear from you. Reach out with questions about admissions, programmes, or school visits.</p>
                    </div>
                </section>

                <section className="section-padding bg-slate-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h2 className="heading-md text-foreground mb-6">Contact Information</h2>
                            <div className="space-y-6 mb-8">
                                {[
                                    { icon: MapPin, label: "Address", value: "Drumvale Secondary School, Off Thika Road, Ruiru, Kiambu County, Kenya" },
                                    { icon: Phone, label: "Phone", value: "+254 712 345 678" },
                                    { icon: Mail, label: "Email", value: "info@drumvale.ac.ke" },
                                    { icon: Clock, label: "Office Hours", value: "Monday – Friday: 7:30 AM – 5:00 PM" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="font-heading font-semibold text-foreground text-sm">{item.label}</p>
                                            <p className="text-sm text-muted-foreground">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Google Map embed — Ruiru, Kiambu County, Kenya */}
                            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 h-64">
                                <iframe
                                    title="Drumvale Secondary School Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d36.9667!3d-1.1456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f3f3f3f3f3f%3A0x0!2sRuiru%2C+Kiambu+County%2C+Kenya!5e0!3m2!1sen!2ske!4v1680000000000!5m2!1sen!2ske"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="heading-md text-foreground mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                                    <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required />
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 font-heading text-base shadow-md">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
