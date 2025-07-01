import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";

const PlaceholderPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <DashboardLayout>
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground max-w-md">{description}</p>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        <p className="text-sm text-muted-foreground">Coming Soon</p>
      </div>
    </div>
  </DashboardLayout>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/sip"
            element={
              <PlaceholderPage
                title="SIP Settings"
                description="Configure SIP server connection and telephony settings"
              />
            }
          />
          <Route
            path="/integration"
            element={
              <PlaceholderPage
                title="1C Integration"
                description="Manage 1C:Itilium API connection and data synchronization"
              />
            }
          />
          <Route
            path="/voice"
            element={
              <PlaceholderPage
                title="Voice Configuration"
                description="Configure TTS, STT engines and voice parameters"
              />
            }
          />
          <Route
            path="/faq"
            element={
              <PlaceholderPage
                title="FAQ Management"
                description="Manage knowledge base and automated responses"
              />
            }
          />
          <Route
            path="/logs"
            element={
              <PlaceholderPage
                title="Call Logs"
                description="View call history and conversation transcripts"
              />
            }
          />
          <Route
            path="/monitoring"
            element={
              <PlaceholderPage
                title="System Monitoring"
                description="Real-time system status and performance metrics"
              />
            }
          />
          <Route
            path="/alerts"
            element={
              <PlaceholderPage
                title="Alert Management"
                description="Configure and manage system alerts and notifications"
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
