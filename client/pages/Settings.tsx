import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Phone,
  Database,
  Mic,
  Shield,
  Bell,
  Save,
  TestTube,
} from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your voice bot system
            </p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SIP Configuration */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                SIP Configuration
              </h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sip-server">SIP Server</Label>
                  <Input
                    id="sip-server"
                    placeholder="192.168.1.100"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="sip-port">Port</Label>
                  <Input id="sip-port" placeholder="5060" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="sip-username">Username</Label>
                <Input
                  id="sip-username"
                  placeholder="voicebot"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sip-password">Password</Label>
                <Input
                  id="sip-password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
            </div>
          </Card>

          {/* 1C Integration */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                1C:Itilium Integration
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="1c-url">1C Server URL</Label>
                <Input
                  id="1c-url"
                  placeholder="https://1c.company.com/api"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="1c-api-key">API Key</Label>
                <Input
                  id="1c-api-key"
                  type="password"
                  placeholder="••••••••••••••••"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-sync">Auto Sync</Label>
                <Switch id="auto-sync" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <TestTube className="w-4 h-4 mr-2" />
                Test API Connection
              </Button>
            </div>
          </Card>

          {/* Voice Configuration */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Voice Configuration
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tts-model">TTS Model</Label>
                <select
                  id="tts-model"
                  className="mt-1 w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option>Coqui.ai Russian</option>
                  <option>Mozilla TTS</option>
                  <option>Silero TTS</option>
                </select>
              </div>
              <div>
                <Label htmlFor="stt-model">STT Model</Label>
                <select
                  id="stt-model"
                  className="mt-1 w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option>Vosk Russian</option>
                  <option>Whisper.cpp</option>
                  <option>Silero STT</option>
                </select>
              </div>
              <div>
                <Label htmlFor="voice-speed">Speech Speed</Label>
                <Input
                  id="voice-speed"
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  defaultValue="1.0"
                  className="mt-1"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <TestTube className="w-4 h-4 mr-2" />
                Test Voice
              </Button>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Security
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="encryption">Enable Encryption</Label>
                <Switch id="encryption" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="call-recording">Call Recording</Label>
                <Switch id="call-recording" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="data-retention">Data Retention (Days)</Label>
                <Input type="number" defaultValue="90" className="w-20" />
              </div>
              <Separator />
              <div>
                <Label htmlFor="admin-password">Change Admin Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="New password"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Notification Settings
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <Switch id="email-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="telegram-alerts">Telegram Notifications</Label>
                <Switch id="telegram-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="system-alerts">System Alerts</Label>
                <Switch id="system-alerts" defaultChecked />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                <Input
                  id="telegram-token"
                  placeholder="Bot token"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
