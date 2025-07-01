// Legacy demo interface for backward compatibility
export interface DemoResponse {
  message: string;
}

// VoiceBot API Types
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

export interface CallLog {
  id?: string;
  callId: string;
  callerNumber: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  transcript?: string;
  intent?: string;
  resolution?: string;
  ticketId?: string;
  status: "active" | "completed" | "failed";
  recordings?: string[];
}

export interface SystemMetrics {
  id?: string;
  timestamp: Date;
  sipStatus: boolean;
  oneCStatus: boolean;
  voiceStatus: boolean;
  activeCalls: number;
  totalCalls: number;
  avgCallDuration: number;
  recognitionAccuracy: number;
}

export interface DashboardStats {
  totalCallsToday: number;
  activeCallsNow: number;
  avgCallDuration: number;
  recognitionAccuracy: number;
  recentTickets: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TestConnectionResponse {
  success: boolean;
  error?: string;
  version?: string;
}

export interface CreateTicketResponse {
  success: boolean;
  ticketId?: string;
  error?: string;
}
