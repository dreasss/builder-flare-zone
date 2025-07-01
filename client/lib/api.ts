// SIP API Types
export interface SIPConfig {
  server: string;
  port: number;
  username: string;
  password: string;
  domain?: string;
}

export interface SIPStatus {
  connected: boolean;
  registered: boolean;
  lastError?: string;
  lastConnection?: Date;
  activeCalls: number;
}

// 1C API Types
export interface OneCConfig {
  baseUrl: string;
  apiKey: string;
  username?: string;
  password?: string;
}

export interface OneCTicket {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "new" | "in_progress" | "resolved" | "closed";
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  customerName: string;
  customerPhone?: string;
  category: string;
}

export interface OneCStatus {
  connected: boolean;
  lastSync?: Date;
  lastError?: string;
  apiVersion?: string;
  totalTickets: number;
}

// Voice API Types
export interface VoiceConfig {
  ttsEngine: "coqui" | "mozilla" | "silero";
  sttEngine: "vosk" | "whisper" | "silero";
  language: string;
  voiceModel: string;
  speechRate: number;
  pitch: number;
  volume: number;
}

export interface VoiceStatus {
  ttsReady: boolean;
  sttReady: boolean;
  lastError?: string;
  processedAudio: number;
  accuracy: number;
}

// Dashboard Types
export interface DashboardStats {
  totalCallsToday: number;
  activeCallsNow: number;
  avgCallDuration: number;
  recognitionAccuracy: number;
  recentTickets: number;
}

// API Client Class
class ApiClient {
  private baseUrl = "";

  // SIP API Methods
  async testSipConnection(
    config: SIPConfig,
  ): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("/api/sip/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return response.json();
  }

  async registerSip(
    config: SIPConfig,
  ): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("/api/sip/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return response.json();
  }

  async getSipStatus(): Promise<{
    success: boolean;
    status?: SIPStatus;
    error?: string;
  }> {
    const response = await fetch("/api/sip/status");
    return response.json();
  }

  async simulateCall(
    callerId: string,
  ): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("/api/sip/simulate-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callerId }),
    });
    return response.json();
  }

  // 1C API Methods
  async testOneCConnection(
    config: OneCConfig,
  ): Promise<{ success: boolean; error?: string; version?: string }> {
    const response = await fetch("/api/1c/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return response.json();
  }

  async connectOneC(
    config: OneCConfig,
  ): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("/api/1c/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return response.json();
  }

  async getOneCStatus(): Promise<{
    success: boolean;
    status?: OneCStatus;
    error?: string;
  }> {
    const response = await fetch("/api/1c/status");
    return response.json();
  }

  async createTicket(
    ticketData: Omit<OneCTicket, "id" | "createdAt" | "updatedAt">,
  ): Promise<{ success: boolean; ticketId?: string; error?: string }> {
    const response = await fetch("/api/1c/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });
    return response.json();
  }

  async getTickets(
    limit: number = 20,
  ): Promise<{ success: boolean; tickets?: OneCTicket[]; error?: string }> {
    const response = await fetch(`/api/1c/tickets?limit=${limit}`);
    return response.json();
  }

  // Voice API Methods
  async initializeVoiceEngines(
    config: VoiceConfig,
  ): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("/api/voice/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return response.json();
  }

  async testVoiceEngine(): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("/api/voice/test", {
      method: "POST",
    });
    return response.json();
  }

  async getVoiceStatus(): Promise<{
    success: boolean;
    status?: VoiceStatus;
    error?: string;
  }> {
    const response = await fetch("/api/voice/status");
    return response.json();
  }

  async synthesizeText(text: string): Promise<Blob> {
    const response = await fetch("/api/voice/synthesize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return response.blob();
  }

  async recognizeAudio(audioFile: File): Promise<{
    success: boolean;
    result?: { text: string; confidence: number };
    error?: string;
  }> {
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await fetch("/api/voice/recognize", {
      method: "POST",
      body: formData,
    });
    return response.json();
  }

  // Dashboard API Methods
  async getDashboardStats(): Promise<{
    success: boolean;
    stats?: DashboardStats;
    error?: string;
  }> {
    const response = await fetch("/api/dashboard/stats");
    return response.json();
  }

  async getCallLogs(
    limit: number = 50,
    offset: number = 0,
  ): Promise<{ success: boolean; logs?: any[]; error?: string }> {
    const response = await fetch(
      `/api/logs/calls?limit=${limit}&offset=${offset}`,
    );
    return response.json();
  }

  async getSystemMetrics(
    hours: number = 24,
  ): Promise<{ success: boolean; metrics?: any[]; error?: string }> {
    const response = await fetch(`/api/metrics?hours=${hours}`);
    return response.json();
  }
}

export const apiClient = new ApiClient();
