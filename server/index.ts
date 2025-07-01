import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// Import API routes
import * as sipRoutes from "./routes/sip";
import * as oneCRoutes from "./routes/oneC";
import * as voiceRoutes from "./routes/voice";
import * as dbRoutes from "./routes/database";

// Import services
import { sipService } from "./services/sipService";
import { databaseService } from "./services/databaseService";
import { InitService } from "./services/initService";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "VoiceBot API Server v1.0 - Ready!" });
  });

  app.get("/api/demo", handleDemo);

  // SIP API routes
  app.post("/api/sip/test", sipRoutes.testSIPConnection);
  app.post("/api/sip/register", sipRoutes.registerSIP);
  app.post("/api/sip/unregister", sipRoutes.unregisterSIP);
  app.get("/api/sip/status", sipRoutes.getSIPStatus);
  app.post("/api/sip/simulate-call", sipRoutes.simulateCall);
  app.post("/api/sip/end-call", sipRoutes.endCall);

  // 1C API routes
  app.post("/api/1c/test", oneCRoutes.testOneCConnection);
  app.post("/api/1c/connect", oneCRoutes.connectOneC);
  app.post("/api/1c/tickets", oneCRoutes.createTicket);
  app.get("/api/1c/tickets", oneCRoutes.getTickets);
  app.get("/api/1c/status", oneCRoutes.getOneCStatus);

  // Voice API routes
  app.post("/api/voice/initialize", voiceRoutes.initializeVoiceEngines);
  app.post("/api/voice/synthesize", voiceRoutes.synthesizeText);
  app.post("/api/voice/recognize", ...voiceRoutes.recognizeAudio);
  app.post("/api/voice/test", voiceRoutes.testVoiceEngine);
  app.get("/api/voice/status", voiceRoutes.getVoiceStatus);
  app.put("/api/voice/config", voiceRoutes.updateVoiceConfig);

  // Database API routes
  app.get("/api/logs/calls", dbRoutes.getCallLogs);
  app.post("/api/logs/calls", dbRoutes.createCallLog);
  app.put("/api/logs/calls/:callId", dbRoutes.updateCallLog);
  app.get("/api/dashboard/stats", dbRoutes.getDashboardStats);
  app.get("/api/metrics", dbRoutes.getSystemMetrics);
  app.post("/api/metrics", dbRoutes.insertSystemMetrics);

  // Demo/Testing endpoints
  app.post("/api/demo/simulate-call", (req, res) => {
    InitService.simulateIncomingCall();
    res.json({ success: true, message: "Incoming call simulated" });
  });

  app.post("/api/demo/create-ticket", (req, res) => {
    InitService.createTestTicket();
    res.json({ success: true, message: "Test ticket creation logged" });
  });

  // Initialize system on startup
  InitService.initializeSystem().catch(console.error);

  // Setup real-time monitoring
  setupRealtimeMonitoring();

  return app;
}

function setupRealtimeMonitoring() {
  // Listen to SIP events and store in database
  sipService.on("incomingCall", async (data) => {
    try {
      await databaseService.insertCallLog({
        callId: `call-${Date.now()}`,
        callerNumber: data.callerId,
        startTime: data.timestamp,
        status: "active",
      });
      console.log(`📞 Incoming call from ${data.callerId}`);
    } catch (error) {
      console.error("Error logging incoming call:", error);
    }
  });

  sipService.on("callEnded", async (data) => {
    console.log(`📞 Call ended at ${data.timestamp}`);
  });

  sipService.on("registered", (status) => {
    console.log("📞 SIP registered:", status);
  });

  sipService.on("connectionLost", (status) => {
    console.error("📞 SIP connection lost:", status.lastError);
  });

  // System health monitoring every minute
  setInterval(async () => {
    try {
      const sipStatus = sipService.getStatus();

      await databaseService.insertMetrics({
        timestamp: new Date(),
        sipStatus: sipStatus.connected,
        oneCStatus: false, // Updated by 1C service
        voiceStatus: false, // Updated by voice service
        activeCalls: sipStatus.activeCalls,
        totalCalls: 0, // Calculate from logs
        avgCallDuration: 0, // Calculate from logs
        recognitionAccuracy: 0.92, // Get from voice service
      });
    } catch (error) {
      console.error("Error recording system metrics:", error);
    }
  }, 60000);

  console.log("🚀 VoiceBot monitoring system initialized");
}
