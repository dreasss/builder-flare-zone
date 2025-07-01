import { databaseService } from "./databaseService";
import { sipService } from "./sipService";
import { voiceService } from "./voiceService";

export class InitService {
  static async initializeSystem(): Promise<void> {
    console.log("🚀 Инициализация системы VoiceBot...");

    // Setup system monitoring only - no demo data
    this.startSystemMonitoring();

    console.log("✅ Система VoiceBot инициализирована успешно");
  }

  private static startSystemMonitoring(): void {
    // Monitor system health every 30 seconds
    setInterval(async () => {
      try {
        const sipStatus = sipService.getStatus();
        const voiceStatus = voiceService.getStatus();

        await databaseService.insertMetrics({
          timestamp: new Date(),
          sipStatus: sipStatus.connected,
          oneCStatus: false, // Will be updated when 1C connects
          voiceStatus: voiceStatus.ttsReady && voiceStatus.sttReady,
          activeCalls: sipStatus.activeCalls,
          totalCalls: 0, // Calculate from logs
          avgCallDuration: 0, // Calculate from logs
          recognitionAccuracy: voiceStatus.accuracy,
        });
      } catch (error) {
        console.error("Error in system monitoring:", error);
      }
    }, 30000);
  }

  static async simulateIncomingCall(): Promise<void> {
    const callerNumbers = [
      "+7-495-123-4567",
      "+7-495-987-6543",
      "+7-495-555-0123",
      "+7-495-777-8899",
      "+7-495-111-2233",
    ];

    const randomCaller =
      callerNumbers[Math.floor(Math.random() * callerNumbers.length)];

    sipService.simulateIncomingCall(randomCaller);

    // Simulate call ending after random duration (30s - 5min)
    const duration = Math.floor(Math.random() * 270) + 30;

    setTimeout(() => {
      sipService.endCall();
    }, duration * 1000);
  }
}
