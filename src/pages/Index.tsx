import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import QuickHighlights from "@/components/home/QuickHighlights";
import AboutSection from "@/components/home/AboutSection";
import AcademicPrograms from "@/components/home/AcademicPrograms";
import CampusLifeBanner from "@/components/home/CampusLifeBanner";
import AthleticsSlider from "@/components/home/AthleticsSlider";
import NewsEvents from "@/components/home/NewsEvents";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import NewsletterSignup from "@/components/home/NewsletterSignup";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <QuickHighlights />
                <AboutSection />
                <AcademicPrograms />
                <CampusLifeBanner />
                <AthleticsSlider />
                <NewsEvents />
                <Testimonials />
                <CTABanner />
                <NewsletterSignup />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
