import { RequestHandler } from "express";
import { databaseService, CallLog } from "../services/databaseService";

export const getCallLogs: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const status = req.query.status as string;

    const result = await databaseService.getCallLogs(limit, offset, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createCallLog: RequestHandler = async (req, res) => {
  try {
    const callLog: Omit<CallLog, "id"> = req.body;

    if (!callLog.callId || !callLog.callerNumber || !callLog.startTime) {
      return res.status(400).json({
        success: false,
        error: "Call ID, caller number, and start time are required",
      });
    }

    // Convert string dates to Date objects
    if (typeof callLog.startTime === "string") {
      callLog.startTime = new Date(callLog.startTime);
    }
    if (callLog.endTime && typeof callLog.endTime === "string") {
      callLog.endTime = new Date(callLog.endTime);
    }

    const result = await databaseService.insertCallLog(callLog);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateCallLog: RequestHandler = async (req, res) => {
  try {
    const { callId } = req.params;
    const updates: Partial<CallLog> = req.body;

    if (!callId) {
      return res.status(400).json({
        success: false,
        error: "Call ID is required",
      });
    }

    // Convert string dates to Date objects
    if (updates.endTime && typeof updates.endTime === "string") {
      updates.endTime = new Date(updates.endTime);
    }

    const result = await databaseService.updateCallLog(callId, updates);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getDashboardStats: RequestHandler = async (req, res) => {
  try {
    const result = await databaseService.getDashboardStats();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSystemMetrics: RequestHandler = async (req, res) => {
  try {
    const hours = parseInt(req.query.hours as string) || 24;
    const result = await databaseService.getMetrics(hours);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const insertSystemMetrics: RequestHandler = async (req, res) => {
  try {
    const metrics = {
      ...req.body,
      timestamp: new Date(req.body.timestamp || Date.now()),
    };

    const result = await databaseService.insertMetrics(metrics);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
