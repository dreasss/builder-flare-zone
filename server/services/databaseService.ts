import sqlite3 from "sqlite3";
import * as path from "path";

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

class DatabaseService {
  private db: sqlite3.Database;
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), "data", "voicebot.db");
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
          return;
        }

        this.createTables()
          .then(() => resolve())
          .catch(reject);
      });
    });
  }

  private async createTables(): Promise<void> {
    const createCallLogsTable = `
      CREATE TABLE IF NOT EXISTS call_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        call_id TEXT UNIQUE NOT NULL,
        caller_number TEXT NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME,
        duration INTEGER,
        transcript TEXT,
        intent TEXT,
        resolution TEXT,
        ticket_id TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        recordings TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createMetricsTable = `
      CREATE TABLE IF NOT EXISTS system_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME NOT NULL,
        sip_status BOOLEAN NOT NULL,
        onec_status BOOLEAN NOT NULL,
        voice_status BOOLEAN NOT NULL,
        active_calls INTEGER NOT NULL,
        total_calls INTEGER NOT NULL,
        avg_call_duration REAL NOT NULL,
        recognition_accuracy REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_call_logs_start_time ON call_logs(start_time);
      CREATE INDEX IF NOT EXISTS idx_call_logs_status ON call_logs(status);
      CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON system_metrics(timestamp);
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(createCallLogsTable);
        this.db.run(createMetricsTable);
        this.db.run(createIndexes, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  }

  async insertCallLog(
    callLog: Omit<CallLog, "id">,
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    return new Promise((resolve) => {
      const sql = `
        INSERT INTO call_logs 
        (call_id, caller_number, start_time, end_time, duration, transcript, intent, resolution, ticket_id, status, recordings)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        callLog.callId,
        callLog.callerNumber,
        callLog.startTime.toISOString(),
        callLog.endTime?.toISOString(),
        callLog.duration,
        callLog.transcript,
        callLog.intent,
        callLog.resolution,
        callLog.ticketId,
        callLog.status,
        JSON.stringify(callLog.recordings || []),
      ];

      this.db.run(sql, params, function (err) {
        if (err) {
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, id: this.lastID.toString() });
        }
      });
    });
  }

  async updateCallLog(
    callId: string,
    updates: Partial<CallLog>,
  ): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      const fields = Object.keys(updates)
        .filter(
          (key) => key !== "id" && updates[key as keyof CallLog] !== undefined,
        )
        .map((key) => {
          const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          return `${dbKey} = ?`;
        });

      if (fields.length === 0) {
        resolve({ success: false, error: "No fields to update" });
        return;
      }

      const sql = `UPDATE call_logs SET ${fields.join(", ")} WHERE call_id = ?`;
      const params = Object.keys(updates)
        .filter(
          (key) => key !== "id" && updates[key as keyof CallLog] !== undefined,
        )
        .map((key) => {
          const value = updates[key as keyof CallLog];
          if (value instanceof Date) return value.toISOString();
          if (Array.isArray(value)) return JSON.stringify(value);
          return value;
        });
      params.push(callId);

      this.db.run(sql, params, function (err) {
        if (err) {
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  async getCallLogs(
    limit: number = 50,
    offset: number = 0,
    status?: string,
  ): Promise<{ success: boolean; logs?: CallLog[]; error?: string }> {
    return new Promise((resolve) => {
      let sql = `
        SELECT * FROM call_logs 
        ${status ? "WHERE status = ?" : ""}
        ORDER BY start_time DESC 
        LIMIT ? OFFSET ?
      `;

      const params = status ? [status, limit, offset] : [limit, offset];

      this.db.all(sql, params, (err, rows: any[]) => {
        if (err) {
          resolve({ success: false, error: err.message });
        } else {
          const logs: CallLog[] = rows.map((row) => ({
            id: row.id.toString(),
            callId: row.call_id,
            callerNumber: row.caller_number,
            startTime: new Date(row.start_time),
            endTime: row.end_time ? new Date(row.end_time) : undefined,
            duration: row.duration,
            transcript: row.transcript,
            intent: row.intent,
            resolution: row.resolution,
            ticketId: row.ticket_id,
            status: row.status,
            recordings: row.recordings ? JSON.parse(row.recordings) : [],
          }));
          resolve({ success: true, logs });
        }
      });
    });
  }

  async insertMetrics(
    metrics: Omit<SystemMetrics, "id">,
  ): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      const sql = `
        INSERT INTO system_metrics 
        (timestamp, sip_status, onec_status, voice_status, active_calls, total_calls, avg_call_duration, recognition_accuracy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        metrics.timestamp.toISOString(),
        metrics.sipStatus ? 1 : 0,
        metrics.oneCStatus ? 1 : 0,
        metrics.voiceStatus ? 1 : 0,
        metrics.activeCalls,
        metrics.totalCalls,
        metrics.avgCallDuration,
        metrics.recognitionAccuracy,
      ];

      this.db.run(sql, params, function (err) {
        if (err) {
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  async getMetrics(
    hours: number = 24,
  ): Promise<{ success: boolean; metrics?: SystemMetrics[]; error?: string }> {
    return new Promise((resolve) => {
      const sql = `
        SELECT * FROM system_metrics 
        WHERE timestamp > datetime('now', '-${hours} hours')
        ORDER BY timestamp DESC
      `;

      this.db.all(sql, [], (err, rows: any[]) => {
        if (err) {
          resolve({ success: false, error: err.message });
        } else {
          const metrics: SystemMetrics[] = rows.map((row) => ({
            id: row.id.toString(),
            timestamp: new Date(row.timestamp),
            sipStatus: Boolean(row.sip_status),
            oneCStatus: Boolean(row.onec_status),
            voiceStatus: Boolean(row.voice_status),
            activeCalls: row.active_calls,
            totalCalls: row.total_calls,
            avgCallDuration: row.avg_call_duration,
            recognitionAccuracy: row.recognition_accuracy,
          }));
          resolve({ success: true, metrics });
        }
      });
    });
  }

  async getDashboardStats(): Promise<{
    success: boolean;
    stats?: {
      totalCallsToday: number;
      activeCallsNow: number;
      avgCallDuration: number;
      recognitionAccuracy: number;
      recentTickets: number;
    };
    error?: string;
  }> {
    return new Promise((resolve) => {
      const sql = `
        SELECT 
          COUNT(CASE WHEN date(start_time) = date('now') THEN 1 END) as calls_today,
          COUNT(CASE WHEN status = 'active' THEN 1 END) as active_calls,
          AVG(CASE WHEN duration IS NOT NULL THEN duration END) as avg_duration,
          COUNT(CASE WHEN date(start_time) = date('now') AND ticket_id IS NOT NULL THEN 1 END) as tickets_today
        FROM call_logs
        WHERE start_time > datetime('now', '-7 days')
      `;

      this.db.get(sql, [], (err, row: any) => {
        if (err) {
          resolve({ success: false, error: err.message });
        } else {
          // Get latest metrics for recognition accuracy
          this.db.get(
            "SELECT recognition_accuracy FROM system_metrics ORDER BY timestamp DESC LIMIT 1",
            [],
            (err, metricsRow: any) => {
              resolve({
                success: true,
                stats: {
                  totalCallsToday: row.calls_today || 0,
                  activeCallsNow: row.active_calls || 0,
                  avgCallDuration: row.avg_duration || 0,
                  recognitionAccuracy: metricsRow?.recognition_accuracy || 0.92,
                  recentTickets: row.tickets_today || 0,
                },
              });
            },
          );
        }
      });
    });
  }

  close(): void {
    this.db.close();
  }
}

export const databaseService = new DatabaseService();
