import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

const NewsletterSignup = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success("Thank you for subscribing to our newsletter!");
            setEmail("");
        }
    };

    return (
        <section className="bg-muted section-padding">
            <div className="max-w-2xl mx-auto text-center">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">Stay Connected</h3>
                <p className="text-sm text-muted-foreground mb-6">Subscribe to receive the latest news, events, and updates from Drumvale.</p>
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                        required
                    />
                    <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading">
                        <Send className="w-4 h-4 mr-1" /> Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSignup;
