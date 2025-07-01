import { RequestHandler } from "express";
import { oneCService, OneCConfig, OneCTicket } from "../services/oneC1Service";

export const testOneCConnection: RequestHandler = async (req, res) => {
  try {
    const config: OneCConfig = req.body;

    if (!config.baseUrl || !config.apiKey) {
      return res.status(400).json({
        success: false,
        error: "Missing required 1C configuration fields",
      });
    }

    const result = await oneCService.testConnection(config);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const connectOneC: RequestHandler = async (req, res) => {
  try {
    const config: OneCConfig = req.body;

    if (!config.baseUrl || !config.apiKey) {
      return res.status(400).json({
        success: false,
        error: "Missing required 1C configuration fields",
      });
    }

    const result = await oneCService.connect(config);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createTicket: RequestHandler = async (req, res) => {
  try {
    const ticketData: Omit<OneCTicket, "id" | "createdAt" | "updatedAt"> =
      req.body;

    if (!ticketData.title || !ticketData.customerName) {
      return res.status(400).json({
        success: false,
        error: "Title and customer name are required",
      });
    }

    const result = await oneCService.createTicket(ticketData);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTickets: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await oneCService.getTickets(limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getOneCStatus: RequestHandler = (req, res) => {
  try {
    const status = oneCService.getStatus();
    res.json({ success: true, status });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
