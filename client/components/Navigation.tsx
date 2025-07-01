import { cn } from "@/lib/utils";
import {
  Home,
  Phone,
  Database,
  Mic,
  MessageSquare,
  Settings,
  Activity,
  FileText,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Phone, label: "SIP Settings", href: "/sip" },
  { icon: Database, label: "1C Integration", href: "/integration" },
  { icon: Mic, label: "Voice Config", href: "/voice" },
  { icon: MessageSquare, label: "FAQ Management", href: "/faq" },
  { icon: FileText, label: "Call Logs", href: "/logs" },
  { icon: Activity, label: "Monitoring", href: "/monitoring" },
  { icon: Bell, label: "Alerts", href: "/alerts" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              VoiceBot
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Technical Support
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">
              AD
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-accent-foreground">
              Admin
            </p>
            <p className="text-xs text-sidebar-accent-foreground/60 truncate">
              admin@company.com
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
