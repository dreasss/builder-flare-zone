import { RequestHandler } from "express";
import { voiceService, VoiceConfig } from "../services/voiceService";
import multer from "multer";
import * as path from "path";

const upload = multer({
  dest: "/tmp/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".wav", ".mp3", ".ogg", ".webm"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowedTypes.includes(ext));
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export const initializeVoiceEngines: RequestHandler = async (req, res) => {
  try {
    const config: VoiceConfig = req.body;

    if (!config.ttsEngine || !config.sttEngine) {
      return res.status(400).json({
        success: false,
        error: "TTS and STT engines are required",
      });
    }

    const result = await voiceService.initializeEngines(config);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const synthesizeText: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Text is required for synthesis",
      });
    }

    const result = await voiceService.synthesizeText(text);

    if (result.success && result.result) {
      // Return audio file
      res.sendFile(path.resolve(result.result.audioPath));
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const recognizeAudio = [
  upload.single("audio"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Audio file is required",
        });
      }

      const result = await voiceService.recognizeAudio(req.file.path);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
] as RequestHandler[];

export const testVoiceEngine: RequestHandler = async (req, res) => {
  try {
    const result = await voiceService.testVoiceEngine();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getVoiceStatus: RequestHandler = (req, res) => {
  try {
    const status = voiceService.getStatus();
    res.json({ success: true, status });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateVoiceConfig: RequestHandler = (req, res) => {
  try {
    const config: Partial<VoiceConfig> = req.body;
    voiceService.updateConfig(config);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
