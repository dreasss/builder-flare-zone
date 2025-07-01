import { RequestHandler } from "express";
import { sipService, SIPConfig } from "../services/sipService";

export const testSIPConnection: RequestHandler = async (req, res) => {
  try {
    const config: SIPConfig = req.body;

    if (
      !config.server ||
      !config.port ||
      !config.username ||
      !config.password
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required SIP configuration fields",
      });
    }

    const result = await sipService.testConnection(config);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const registerSIP: RequestHandler = async (req, res) => {
  try {
    const config: SIPConfig = req.body;

    if (
      !config.server ||
      !config.port ||
      !config.username ||
      !config.password
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required SIP configuration fields",
      });
    }

    const result = await sipService.register(config);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const unregisterSIP: RequestHandler = async (req, res) => {
  try {
    await sipService.unregister();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSIPStatus: RequestHandler = (req, res) => {
  try {
    const status = sipService.getStatus();
    res.json({ success: true, status });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const simulateCall: RequestHandler = (req, res) => {
  try {
    const { callerId } = req.body;
    if (!callerId) {
      return res.status(400).json({
        success: false,
        error: "Caller ID is required",
      });
    }

    sipService.simulateIncomingCall(callerId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const endCall: RequestHandler = (req, res) => {
  try {
    sipService.endCall();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
