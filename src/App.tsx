import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortalProvider } from "./context/PortalContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import StudentLife from "./pages/StudentLife";
import AthleticsPage from "./pages/AthleticsPage";
import NewsEventsPage from "./pages/NewsEventsPage";
import Alumni from "./pages/Alumni";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ParentPortal from "./pages/ParentPortal";
import StudentPortal from "./pages/StudentPortal";
import StaffPortal from "./pages/StaffPortal";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <PortalProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/academics" element={<Academics />} />
                        <Route path="/admissions" element={<Admissions />} />
                        <Route path="/student-life" element={<StudentLife />} />
                        <Route path="/athletics" element={<AthleticsPage />} />
                        <Route path="/news-events" element={<NewsEventsPage />} />
                        <Route path="/alumni" element={<Alumni />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/portal/parents" element={<ParentPortal />} />
                        <Route path="/portal/students" element={<StudentPortal />} />
                        <Route path="/portal/staff" element={<StaffPortal />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </PortalProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
