import { Navigation } from "./Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
