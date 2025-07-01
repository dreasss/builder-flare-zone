import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  status: "online" | "offline" | "warning" | "error";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatusCard({
  title,
  value,
  description,
  icon: Icon,
  status,
  trend,
}: StatusCardProps) {
  const statusColors = {
    online: "text-green-400",
    offline: "text-gray-400",
    warning: "text-yellow-400",
    error: "text-red-400",
  };

  const statusBgColors = {
    online: "bg-green-400/10",
    offline: "bg-gray-400/10",
    warning: "bg-yellow-400/10",
    error: "bg-red-400/10",
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", statusBgColors[status])}>
            <Icon className={cn("w-5 h-5", statusColors[status])} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-400" : "text-red-400",
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className={cn("w-2 h-2 rounded-full", statusColors[status])} />
      </div>
    </div>
  );
}
