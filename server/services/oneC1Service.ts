import axios, { AxiosInstance } from "axios";

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

class OneCService {
  private config: OneCConfig | null = null;
  private client: AxiosInstance | null = null;
  private status: OneCStatus = {
    connected: false,
    totalTickets: 0,
  };

  async testConnection(
    config: OneCConfig,
  ): Promise<{ success: boolean; error?: string; version?: string }> {
    try {
      const client = axios.create({
        baseURL: config.baseUrl,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      // Test endpoint - обычно в 1С это $metadata для OData
      const response = await client.get("/$metadata");

      return {
        success: true,
        version: response.headers["odata-version"] || "4.0",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: `HTTP ${error.response?.status}: ${error.response?.statusText || error.message}`,
        };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async connect(
    config: OneCConfig,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const testResult = await this.testConnection(config);
      if (!testResult.success) {
        this.status.lastError = testResult.error;
        return { success: false, error: testResult.error };
      }

      this.config = config;
      this.client = axios.create({
        baseURL: config.baseUrl,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      this.status.connected = true;
      this.status.lastSync = new Date();
      this.status.apiVersion = testResult.version;
      this.status.lastError = undefined;

      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      this.status.lastError = errorMsg;
      return { success: false, error: errorMsg };
    }
  }

  async createTicket(
    ticketData: Omit<OneCTicket, "id" | "createdAt" | "updatedAt">,
  ): Promise<{ success: boolean; ticketId?: string; error?: string }> {
    if (!this.client || !this.status.connected) {
      return { success: false, error: "Not connected to 1C" };
    }

    try {
      const payload = {
        Название: ticketData.title,
        Описание: ticketData.description,
        Приоритет: this.mapPriorityTo1C(ticketData.priority),
        Статус: "Новая",
        КатегорияОбращения: ticketData.category,
        ИмяКлиента: ticketData.customerName,
        ТелефонКлиента: ticketData.customerPhone,
        ДатаСоздания: new Date().toISOString(),
      };

      const response = await this.client.post(
        "/InformationRegisters/ЗаявкиТехподдержки",
        payload,
      );

      this.status.totalTickets++;

      return {
        success: true,
        ticketId: response.data.Ref_Key || response.data.id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: `1C API Error: ${error.response?.status} ${error.response?.statusText}`,
        };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getTickets(
    limit: number = 20,
  ): Promise<{ success: boolean; tickets?: OneCTicket[]; error?: string }> {
    if (!this.client || !this.status.connected) {
      return { success: false, error: "Not connected to 1C" };
    }

    try {
      const response = await this.client.get(
        `/InformationRegisters/ЗаявкиТехподдержки?$top=${limit}&$orderby=ДатаСоздания desc`,
      );

      const tickets: OneCTicket[] =
        response.data.value?.map((item: any) => ({
          id: item.Ref_Key || item.id,
          title: item.Название,
          description: item.Описание,
          priority: this.mapPriorityFromOneC(item.Приоритет),
          status: this.mapStatusFromOneC(item.Статус),
          createdAt: new Date(item.ДатаСоздания),
          updatedAt: new Date(item.ДатаИзменения || item.ДатаСоздания),
          customerName: item.ИмяКлиента,
          customerPhone: item.ТелефонКлиента,
          category: item.КатегорияОбращения,
          assignedTo: item.Исполнитель,
        })) || [];

      return { success: true, tickets };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: `1C API Error: ${error.response?.status} ${error.response?.statusText}`,
        };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  getStatus(): OneCStatus {
    return { ...this.status };
  }

  private mapPriorityTo1C(priority: string): string {
    const map: Record<string, string> = {
      low: "Низкий",
      medium: "Средний",
      high: "Высокий",
      critical: "Критический",
    };
    return map[priority] || "Средний";
  }

  private mapPriorityFromOneC(
    priority: string,
  ): "low" | "medium" | "high" | "critical" {
    const map: Record<string, "low" | "medium" | "high" | "critical"> = {
      Низкий: "low",
      Средний: "medium",
      Высокий: "high",
      Критический: "critical",
    };
    return map[priority] || "medium";
  }

  private mapStatusFromOneC(
    status: string,
  ): "new" | "in_progress" | "resolved" | "closed" {
    const map: Record<string, "new" | "in_progress" | "resolved" | "closed"> = {
      Новая: "new",
      "В работе": "in_progress",
      Решена: "resolved",
      Закрыта: "closed",
    };
    return map[status] || "new";
  }
}

export const oneCService = new OneCService();
