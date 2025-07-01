import { EventEmitter } from "events";
import * as net from "net";

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

class SIPService extends EventEmitter {
  private config: SIPConfig | null = null;
  private status: SIPStatus = {
    connected: false,
    registered: false,
    activeCalls: 0,
  };
  private socket: net.Socket | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  async testConnection(
    config: SIPConfig,
  ): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      const timeout = setTimeout(() => {
        socket.destroy();
        resolve({ success: false, error: "Connection timeout" });
      }, 5000);

      socket.connect(config.port, config.server, () => {
        clearTimeout(timeout);
        socket.end();
        resolve({ success: true });
      });

      socket.on("error", (err) => {
        clearTimeout(timeout);
        resolve({ success: false, error: err.message });
      });
    });
  }

  async register(
    config: SIPConfig,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      this.config = config;

      // Simulate SIP REGISTER process
      const testResult = await this.testConnection(config);
      if (!testResult.success) {
        this.status.lastError = testResult.error;
        return testResult;
      }

      this.status.connected = true;
      this.status.registered = true;
      this.status.lastConnection = new Date();
      this.status.lastError = undefined;

      this.startHeartbeat();
      this.emit("registered", this.status);

      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      this.status.lastError = errorMsg;
      return { success: false, error: errorMsg };
    }
  }

  async unregister(): Promise<void> {
    this.status.connected = false;
    this.status.registered = false;

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }

    this.emit("unregistered");
  }

  getStatus(): SIPStatus {
    return { ...this.status };
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(async () => {
      if (this.config) {
        const testResult = await this.testConnection(this.config);
        if (!testResult.success) {
          this.status.connected = false;
          this.status.registered = false;
          this.status.lastError = testResult.error;
          this.emit("connectionLost", this.status);
        }
      }
    }, 30000); // Check every 30 seconds
  }

  // Simulate incoming call
  simulateIncomingCall(callerId: string): void {
    this.status.activeCalls++;
    this.emit("incomingCall", { callerId, timestamp: new Date() });
  }

  // End call
  endCall(): void {
    if (this.status.activeCalls > 0) {
      this.status.activeCalls--;
      this.emit("callEnded", { timestamp: new Date() });
    }
  }
}

export const sipService = new SIPService();
