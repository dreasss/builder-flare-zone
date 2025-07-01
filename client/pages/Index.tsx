import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusCard } from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  apiClient,
  DashboardStats,
  SIPStatus,
  OneCStatus,
  VoiceStatus,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
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

interface SystemStatus {
  sip: SIPStatus | null;
  oneC: OneCStatus | null;
  voice: VoiceStatus | null;
}

export default function Index() {
  const { toast } = useToast();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    sip: null,
    oneC: null,
    voice: null,
  });
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load dashboard stats
      const statsResult = await apiClient.getDashboardStats();
      if (statsResult.success && statsResult.stats) {
        setDashboardStats(statsResult.stats);
      }

      // Load system status
      const [sipResult, oneCResult, voiceResult] = await Promise.all([
        apiClient.getSipStatus(),
        apiClient.getOneCStatus(),
        apiClient.getVoiceStatus(),
      ]);

      setSystemStatus({
        sip: sipResult.success ? sipResult.status || null : null,
        oneC: oneCResult.success ? oneCResult.status || null : null,
        voice: voiceResult.success ? voiceResult.status || null : null,
      });

      // Load recent tickets
      const ticketsResult = await apiClient.getTickets(4);
      if (ticketsResult.success && ticketsResult.tickets) {
        setRecentTickets(ticketsResult.tickets);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSipStatusInfo = () => {
    if (!systemStatus.sip) return { status: "offline", value: "Disconnected" };
    if (systemStatus.sip.connected && systemStatus.sip.registered) {
      return { status: "online", value: "Online" };
    }
    if (systemStatus.sip.connected) {
      return { status: "warning", value: "Connected" };
    }
    return { status: "error", value: "Error" };
  };

  const getOneCStatusInfo = () => {
    if (!systemStatus.oneC) return { status: "offline", value: "Disconnected" };
    return systemStatus.oneC.connected
      ? { status: "online", value: "Connected" }
      : { status: "error", value: "Error" };
  };

  const getVoiceStatusInfo = () => {
    if (!systemStatus.voice) return { status: "offline", value: "Not Ready" };
    if (systemStatus.voice.ttsReady && systemStatus.voice.sttReady) {
      return { status: "online", value: "Active" };
    }
    if (systemStatus.voice.ttsReady || systemStatus.voice.sttReady) {
      return { status: "warning", value: "Partial" };
    }
    return { status: "error", value: "Error" };
  };
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
            value={getSipStatusInfo().value}
            description={
              systemStatus.sip?.lastError || "Asterisk PBX connection"
            }
            icon={Phone}
            status={getSipStatusInfo().status as any}
          />
          <StatusCard
            title="1C:Itilium"
            value={getOneCStatusInfo().value}
            description={
              systemStatus.oneC?.apiVersion
                ? `API v${systemStatus.oneC.apiVersion}`
                : "API connection"
            }
            icon={Database}
            status={getOneCStatusInfo().status as any}
          />
          <StatusCard
            title="Voice Engine"
            value={getVoiceStatusInfo().value}
            description={systemStatus.voice?.lastError || "TTS/STT engines"}
            icon={Mic}
            status={getVoiceStatusInfo().status as any}
          />
          <StatusCard
            title="Active Calls"
            value={systemStatus.sip?.activeCalls?.toString() || "0"}
            description="Current conversations"
            icon={Users}
            status={systemStatus.sip?.activeCalls ? "online" : "offline"}
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
                <span className="text-lg font-bold text-foreground">
                  {dashboardStats?.totalCallsToday || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm font-medium">Tickets Created</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                  {dashboardStats?.recentTickets || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-sm font-medium">Avg Call Time</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                  {dashboardStats?.avgCallDuration
                    ? `${Math.floor(dashboardStats.avgCallDuration / 60)}m ${Math.floor(dashboardStats.avgCallDuration % 60)}s`
                    : "0m 0s"}
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
              {recentTickets.length > 0 ? (
                recentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            ticket.priority === "critical" ||
                            ticket.priority === "high"
                              ? "bg-red-400"
                              : ticket.priority === "medium"
                                ? "bg-yellow-400"
                                : "bg-green-400"
                          }`}
                        />
                      </div>
                      <p className="text-sm font-medium text-foreground mt-1">
                        {ticket.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleTimeString()} -{" "}
                        {ticket.customerName}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent tickets found</p>
                  <p className="text-xs">
                    Tickets will appear here when created
                  </p>
                </div>
              )}
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
                  {systemStatus.voice?.accuracy
                    ? `${(systemStatus.voice.accuracy * 100).toFixed(1)}%`
                    : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Speech Recognition
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {dashboardStats?.recognitionAccuracy
                    ? `${(dashboardStats.recognitionAccuracy * 100).toFixed(1)}%`
                    : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Overall Accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {systemStatus.voice?.processedAudio || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Processed Calls
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
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={async () => {
                  try {
                    const response = await fetch("/api/demo/simulate-call", {
                      method: "POST",
                    });
                    const result = await response.json();
                    if (result.success) {
                      toast({
                        title: "Call Simulated",
                        description: "Incoming call simulation started",
                      });
                      // Refresh data after a moment
                      setTimeout(loadDashboardData, 1000);
                    }
                  } catch (error) {
                    console.error("Error simulating call:", error);
                  }
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Simulate Incoming Call
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={async () => {
                  const result = await apiClient.testVoiceEngine();
                  toast({
                    title: result.success
                      ? "Voice Test Success"
                      : "Voice Test Failed",
                    description: result.error || "Voice engines tested",
                    variant: result.success ? "default" : "destructive",
                  });
                }}
              >
                <Mic className="w-4 h-4 mr-2" />
                Test Voice Engine
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={async () => {
                  try {
                    const response = await fetch("/api/demo/create-ticket", {
                      method: "POST",
                    });
                    const result = await response.json();
                    if (result.success) {
                      toast({
                        title: "Demo Ticket",
                        description: "Test ticket creation logged",
                      });
                    }
                  } catch (error) {
                    console.error("Error creating demo ticket:", error);
                  }
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Create Demo Ticket
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => (window.location.href = "/help")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Помощь и инструкции
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={loadDashboardData}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Обновить данные
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
