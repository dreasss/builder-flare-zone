import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusCard } from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Phone,
  Database,
  Mic,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  MessageCircle,
} from "lucide-react";

export default function Index() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              VoiceBot Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Technical Support & Request Management System
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              System Status
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            title="SIP Connection"
            value="Online"
            description="Asterisk PBX connected"
            icon={Phone}
            status="online"
          />
          <StatusCard
            title="1C:Itilium"
            value="Connected"
            description="API responding"
            icon={Database}
            status="online"
          />
          <StatusCard
            title="Voice Engine"
            value="Active"
            description="TTS/STT operational"
            icon={Mic}
            status="online"
          />
          <StatusCard
            title="Active Calls"
            value="3"
            description="Current conversations"
            icon={Users}
            status="online"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Today's Activity
              </h3>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-medium">Calls Handled</span>
                </div>
                <span className="text-lg font-bold text-foreground">127</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm font-medium">Tickets Created</span>
                </div>
                <span className="text-lg font-bold text-foreground">89</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-sm font-medium">Avg Call Time</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                  2m 34s
                </span>
              </div>
            </div>
          </Card>

          {/* Recent Requests */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Recent Support Requests
              </h3>
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                {
                  id: "IT-2024-001",
                  issue: "Сервер не отвечает",
                  priority: "high",
                  time: "2 min ago",
                },
                {
                  id: "IT-2024-002",
                  issue: "Проблемы с принтером",
                  priority: "medium",
                  time: "5 min ago",
                },
                {
                  id: "IT-2024-003",
                  issue: "Восстановление пароля",
                  priority: "low",
                  time: "8 min ago",
                },
                {
                  id: "IT-2024-004",
                  issue: "Настройка VPN",
                  priority: "medium",
                  time: "12 min ago",
                },
              ].map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {request.id}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          request.priority === "high"
                            ? "bg-red-400"
                            : request.priority === "medium"
                              ? "bg-yellow-400"
                              : "bg-green-400"
                        }`}
                      />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">
                      {request.issue}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {request.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Performance & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Performance */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                AI Performance Metrics
              </h3>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  94.2%
                </div>
                <div className="text-sm text-muted-foreground">
                  Speech Recognition
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  87.8%
                </div>
                <div className="text-sm text-muted-foreground">
                  Intent Classification
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  91.5%
                </div>
                <div className="text-sm text-muted-foreground">
                  Response Accuracy
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="w-4 h-4 mr-2" />
                Test Voice Engine
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                SIP Configuration
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                Sync with 1C
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                View Error Log
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
