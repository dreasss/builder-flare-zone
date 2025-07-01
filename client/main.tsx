import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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
          <Route
            path="/sip"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">
                  SIP Settings - Coming Soon
                </h1>
              </div>
            }
          />
          <Route
            path="/integration"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">
                  1C Integration - Coming Soon
                </h1>
              </div>
            }
          />
          <Route
            path="/voice"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">
                  Voice Config - Coming Soon
                </h1>
              </div>
            }
          />
          <Route
            path="/faq"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">
                  FAQ Management - Coming Soon
                </h1>
              </div>
            }
          />
          <Route
            path="/logs"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">Call Logs - Coming Soon</h1>
              </div>
            }
          />
          <Route
            path="/monitoring"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">Monitoring - Coming Soon</h1>
              </div>
            }
          />
          <Route
            path="/alerts"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">Alerts - Coming Soon</h1>
              </div>
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
