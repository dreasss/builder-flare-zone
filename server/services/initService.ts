import { databaseService } from "./databaseService";
import { sipService } from "./sipService";
import { voiceService } from "./voiceService";

export class InitService {
  static async initializeSystem(): Promise<void> {
    console.log("🚀 Initializing VoiceBot System...");

    // Initialize database with sample data for testing
    await this.createSampleData();

    // Setup system monitoring
    this.startSystemMonitoring();

    console.log("✅ VoiceBot System initialized successfully");
  }

  private static async createSampleData(): Promise<void> {
    try {
      // Create sample call logs for testing
      const sampleCalls = [
        {
          callId: "call-001",
          callerNumber: "+7-495-123-4567",
          startTime: new Date(Date.now() - 3600000), // 1 hour ago
          endTime: new Date(Date.now() - 3450000), // 2.5 minutes duration
          duration: 150,
          transcript: "Здравствуйте, у нас не работает сервер. Можете помочь?",
          intent: "technical_support",
          resolution: "Ticket created: IT-2024-001",
          ticketId: "IT-2024-001",
          status: "completed" as const,
        },
        {
          callId: "call-002",
          callerNumber: "+7-495-987-6543",
          startTime: new Date(Date.now() - 1800000), // 30 minutes ago
          endTime: new Date(Date.now() - 1620000), // 3 minutes duration
          duration: 180,
          transcript: "Проблемы с принтером в 3-м кабинете",
          intent: "hardware_issue",
          resolution: "Ticket created: IT-2024-002",
          ticketId: "IT-2024-002",
          status: "completed" as const,
        },
        {
          callId: "call-003",
          callerNumber: "+7-495-555-0123",
          startTime: new Date(Date.now() - 600000), // 10 minutes ago
          endTime: new Date(Date.now() - 480000), // 2 minutes duration
          duration: 120,
          transcript: "Нужно восстановить пароль от учетной записи",
          intent: "password_reset",
          resolution: "Password reset instructions sent",
          status: "completed" as const,
        },
        {
          callId: "call-004",
          callerNumber: "+7-495-777-8899",
          startTime: new Date(),
          status: "active" as const,
        },
      ];

      for (const call of sampleCalls) {
        await databaseService.insertCallLog(call);
      }

      // Create initial system metrics
      await databaseService.insertMetrics({
        timestamp: new Date(),
        sipStatus: false,
        oneCStatus: false,
        voiceStatus: false,
        activeCalls: 1,
        totalCalls: 3,
        avgCallDuration: 150,
        recognitionAccuracy: 0.92,
      });

      console.log("📊 Sample data created for testing");
    } catch (error) {
      console.error("Error creating sample data:", error);
    }
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

  static async createTestTicket(): Promise<void> {
    const sampleIssues = [
      {
        title: "Сервер не отвечает",
        description: "Основной сервер приложений недоступен с утра",
        priority: "high" as const,
        category: "Серверы",
        customerName: "Иванов Петр Сергеевич",
        customerPhone: "+7-495-123-4567",
      },
      {
        title: "Проблемы с принтером",
        description: "Принтер HP в кабинете 301 не печатает документы",
        priority: "medium" as const,
        category: "Оборудование",
        customerName: "Смирнова Анна Владимировна",
        customerPhone: "+7-495-987-6543",
      },
      {
        title: "Восстановление пароля",
        description: "Сотрудник забыл пароль от корпоративной почты",
        priority: "low" as const,
        category: "Учетные записи",
        customerName: "Козлов Алексей Михайлович",
        customerPhone: "+7-495-555-0123",
      },
    ];

    const issue = sampleIssues[Math.floor(Math.random() * sampleIssues.length)];

    // In real implementation, this would create a 1C ticket
    console.log("📋 Test ticket would be created:", issue);
  }
}
