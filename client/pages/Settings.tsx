import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { apiClient, SIPConfig, OneCConfig, VoiceConfig } from "@/lib/api";
import {
  Phone,
  Database,
  Mic,
  Shield,
  Bell,
  Save,
  TestTube,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();

  // State for configurations
  const [sipConfig, setSipConfig] = useState<SIPConfig>({
    server: "",
    port: 5060,
    username: "",
    password: "",
    domain: "",
  });

  const [oneCConfig, setOneCConfig] = useState<OneCConfig>({
    baseUrl: "",
    apiKey: "",
    username: "",
    password: "",
  });

  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    ttsEngine: "coqui",
    sttEngine: "vosk",
    language: "ru",
    voiceModel: "ru_v3",
    speechRate: 1.0,
    pitch: 0.0,
    volume: 0.8,
  });

  // Loading states
  const [testing, setTesting] = useState({
    sip: false,
    oneC: false,
    voice: false,
  });

  // Test functions
  const testSipConnection = async () => {
    if (!sipConfig.server || !sipConfig.username || !sipConfig.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required SIP fields",
        variant: "destructive",
      });
      return;
    }

    setTesting((prev) => ({ ...prev, sip: true }));
    try {
      const result = await apiClient.testSipConnection(sipConfig);

      if (result.success) {
        toast({
          title: "SIP Test Successful",
          description: "Connection to SIP server established",
        });

        // Auto-register if test successful
        const registerResult = await apiClient.registerSip(sipConfig);
        if (registerResult.success) {
          toast({
            title: "SIP Registration Successful",
            description: "SIP client registered successfully",
          });
        }
      } else {
        toast({
          title: "SIP Test Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "SIP Test Error",
        description: "Failed to test SIP connection",
        variant: "destructive",
      });
    }
    setTesting((prev) => ({ ...prev, sip: false }));
  };

  const testOneCConnection = async () => {
    if (!oneCConfig.baseUrl || !oneCConfig.apiKey) {
      toast({
        title: "Validation Error",
        description: "Please fill in URL and API key",
        variant: "destructive",
      });
      return;
    }

    setTesting((prev) => ({ ...prev, oneC: true }));
    try {
      const result = await apiClient.testOneCConnection(oneCConfig);

      if (result.success) {
        toast({
          title: "1C Test Successful",
          description: `Connected to 1C API ${result.version ? `v${result.version}` : ""}`,
        });

        // Auto-connect if test successful
        await apiClient.connectOneC(oneCConfig);
      } else {
        toast({
          title: "1C Test Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "1C Test Error",
        description: "Failed to test 1C connection",
        variant: "destructive",
      });
    }
    setTesting((prev) => ({ ...prev, oneC: false }));
  };

  const testVoiceEngine = async () => {
    setTesting((prev) => ({ ...prev, voice: true }));
    try {
      // Initialize engines first
      const initResult = await apiClient.initializeVoiceEngines(voiceConfig);

      if (initResult.success) {
        // Then test them
        const testResult = await apiClient.testVoiceEngine();

        if (testResult.success) {
          toast({
            title: "Voice Engine Test Successful",
            description: "TTS and STT engines are working correctly",
          });
        } else {
          toast({
            title: "Voice Engine Test Failed",
            description: testResult.error || "Unknown error occurred",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Voice Engine Initialization Failed",
          description: initResult.error || "Failed to initialize engines",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Voice Engine Error",
        description: "Failed to test voice engines",
        variant: "destructive",
      });
    }
    setTesting((prev) => ({ ...prev, voice: false }));
  };
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
            <p className="text-muted-foreground mt-1">
              Настройка системы голосового бота
            </p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Сохранить изменения
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SIP Configuration */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Настройки SIP
              </h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sip-server">SIP Сервер</Label>
                  <Input
                    id="sip-server"
                    placeholder="192.168.1.100"
                    value={sipConfig.server}
                    onChange={(e) =>
                      setSipConfig((prev) => ({
                        ...prev,
                        server: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="sip-port">Порт</Label>
                  <Input
                    id="sip-port"
                    type="number"
                    placeholder="5060"
                    value={sipConfig.port}
                    onChange={(e) =>
                      setSipConfig((prev) => ({
                        ...prev,
                        port: parseInt(e.target.value) || 5060,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sip-username">Имя пользователя</Label>
                <Input
                  id="sip-username"
                  placeholder="voicebot"
                  value={sipConfig.username}
                  onChange={(e) =>
                    setSipConfig((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sip-password">Пароль</Label>
                <Input
                  id="sip-password"
                  type="password"
                  placeholder="••••••••"
                  value={sipConfig.password}
                  onChange={(e) =>
                    setSipConfig((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={testSipConnection}
                disabled={testing.sip}
              >
                {testing.sip ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <TestTube className="w-4 h-4 mr-2" />
                )}
                {testing.sip ? "Тестирование..." : "Тест и регистрация"}
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
                  placeholder="https://1c.company.com/api/odata"
                  value={oneCConfig.baseUrl}
                  onChange={(e) =>
                    setOneCConfig((prev) => ({
                      ...prev,
                      baseUrl: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="1c-api-key">API Key</Label>
                <Input
                  id="1c-api-key"
                  type="password"
                  placeholder="••••••••••••••••"
                  value={oneCConfig.apiKey}
                  onChange={(e) =>
                    setOneCConfig((prev) => ({
                      ...prev,
                      apiKey: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="1c-username">Username (Optional)</Label>
                  <Input
                    id="1c-username"
                    placeholder="admin"
                    value={oneCConfig.username || ""}
                    onChange={(e) =>
                      setOneCConfig((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="1c-password">Password (Optional)</Label>
                  <Input
                    id="1c-password"
                    type="password"
                    placeholder="••••••••"
                    value={oneCConfig.password || ""}
                    onChange={(e) =>
                      setOneCConfig((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={testOneCConnection}
                disabled={testing.oneC}
              >
                {testing.oneC ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <TestTube className="w-4 h-4 mr-2" />
                )}
                {testing.oneC ? "Testing..." : "Test & Connect"}
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
                <Label htmlFor="tts-model">TTS Engine</Label>
                <select
                  id="tts-model"
                  value={voiceConfig.ttsEngine}
                  onChange={(e) =>
                    setVoiceConfig((prev) => ({
                      ...prev,
                      ttsEngine: e.target.value as any,
                    }))
                  }
                  className="mt-1 w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option value="coqui">Coqui.ai Russian</option>
                  <option value="mozilla">Mozilla TTS</option>
                  <option value="silero">Silero TTS</option>
                </select>
              </div>
              <div>
                <Label htmlFor="stt-model">STT Engine</Label>
                <select
                  id="stt-model"
                  value={voiceConfig.sttEngine}
                  onChange={(e) =>
                    setVoiceConfig((prev) => ({
                      ...prev,
                      sttEngine: e.target.value as any,
                    }))
                  }
                  className="mt-1 w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option value="vosk">Vosk Russian</option>
                  <option value="whisper">Whisper.cpp</option>
                  <option value="silero">Silero STT</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voice-model">Voice Model</Label>
                  <Input
                    id="voice-model"
                    placeholder="ru_v3"
                    value={voiceConfig.voiceModel}
                    onChange={(e) =>
                      setVoiceConfig((prev) => ({
                        ...prev,
                        voiceModel: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    placeholder="ru"
                    value={voiceConfig.language}
                    onChange={(e) =>
                      setVoiceConfig((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="voice-speed">
                  Speech Speed: {voiceConfig.speechRate.toFixed(1)}x
                </Label>
                <Input
                  id="voice-speed"
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceConfig.speechRate}
                  onChange={(e) =>
                    setVoiceConfig((prev) => ({
                      ...prev,
                      speechRate: parseFloat(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={testVoiceEngine}
                disabled={testing.voice}
              >
                {testing.voice ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <TestTube className="w-4 h-4 mr-2" />
                )}
                {testing.voice ? "Testing..." : "Initialize & Test"}
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
