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
        <p className="text-sm text-muted-foreground">Скоро будет доступно</p>
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
                title="Настройки SIP"
                description="Настройка подключения к SIP серверу и телефонии"
              />
            }
          />
          <Route
            path="/integration"
            element={
              <PlaceholderPage
                title="Интеграция 1С"
                description="Управление подключением к 1С:Итилиум API и синхронизация данных"
              />
            }
          />
          <Route
            path="/voice"
            element={
              <PlaceholderPage
                title="Настройки голоса"
                description="Настройка движков TTS, STT и параметров голоса"
              />
            }
          />
          <Route
            path="/faq"
            element={
              <PlaceholderPage
                title="База знаний"
                description="Управление базой знаний и автоматическими ответами"
              />
            }
          />
          <Route
            path="/logs"
            element={
              <PlaceholderPage
                title="Логи звонков"
                description="Просмотр истории звонков и расшифровок разговоров"
              />
            }
          />
          <Route
            path="/monitoring"
            element={
              <PlaceholderPage
                title="Мониторинг системы"
                description="Мониторинг состояния системы и метрики производительности в реальном времени"
              />
            }
          />
          <Route
            path="/alerts"
            element={
              <PlaceholderPage
                title="Управление уведомлениями"
                description="Настройка и управление системными уведомлениями и алертами"
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
