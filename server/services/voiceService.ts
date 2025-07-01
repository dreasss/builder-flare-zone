import { EventEmitter } from "events";
import * as fs from "fs";
import * as path from "path";
import { spawn, ChildProcess } from "child_process";

export interface VoiceConfig {
  ttsEngine: "coqui" | "mozilla" | "silero";
  sttEngine: "vosk" | "whisper" | "silero";
  language: string;
  voiceModel: string;
  speechRate: number;
  pitch: number;
  volume: number;
}

export interface VoiceStatus {
  ttsReady: boolean;
  sttReady: boolean;
  lastError?: string;
  processedAudio: number;
  accuracy: number;
}

export interface RecognitionResult {
  text: string;
  confidence: number;
  timestamp: Date;
  duration: number;
}

export interface SynthesisResult {
  audioPath: string;
  duration: number;
  timestamp: Date;
}

class VoiceService extends EventEmitter {
  private config: VoiceConfig = {
    ttsEngine: "coqui",
    sttEngine: "vosk",
    language: "ru",
    voiceModel: "ru_v3",
    speechRate: 1.0,
    pitch: 0.0,
    volume: 0.8,
  };

  private status: VoiceStatus = {
    ttsReady: false,
    sttReady: false,
    processedAudio: 0,
    accuracy: 0.92,
  };

  private ttsProcess: ChildProcess | null = null;
  private sttProcess: ChildProcess | null = null;

  async initializeEngines(
    config: VoiceConfig,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      this.config = { ...config };

      // Initialize TTS Engine
      const ttsResult = await this.initializeTTS();
      if (!ttsResult.success) {
        return ttsResult;
      }

      // Initialize STT Engine
      const sttResult = await this.initializeSTT();
      if (!sttResult.success) {
        return sttResult;
      }

      this.status.ttsReady = true;
      this.status.sttReady = true;
      this.status.lastError = undefined;

      this.emit("enginesReady", this.status);
      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      this.status.lastError = errorMsg;
      return { success: false, error: errorMsg };
    }
  }

  private async initializeTTS(): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if TTS engine is available
      const enginePath = this.getTTSEnginePath();
      if (!fs.existsSync(enginePath)) {
        return {
          success: false,
          error: `TTS engine not found: ${this.config.ttsEngine}`,
        };
      }

      // Test TTS with a simple phrase
      const testResult = await this.synthesizeText("Тест голосового движка");
      return { success: testResult.success };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "TTS initialization failed",
      };
    }
  }

  private async initializeSTT(): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if STT engine is available
      const enginePath = this.getSTTEnginePath();
      if (!fs.existsSync(enginePath)) {
        return {
          success: false,
          error: `STT engine not found: ${this.config.sttEngine}`,
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "STT initialization failed",
      };
    }
  }

  async synthesizeText(
    text: string,
  ): Promise<{ success: boolean; result?: SynthesisResult; error?: string }> {
    if (!this.status.ttsReady) {
      return { success: false, error: "TTS engine not ready" };
    }

    try {
      const outputPath = path.join("/tmp", `tts_${Date.now()}.wav`);

      return new Promise((resolve) => {
        const enginePath = this.getTTSEnginePath();
        const process = spawn(enginePath, [
          "--text",
          text,
          "--output",
          outputPath,
          "--model",
          this.config.voiceModel,
          "--speed",
          this.config.speechRate.toString(),
        ]);

        let error = "";
        process.stderr.on("data", (data) => {
          error += data.toString();
        });

        process.on("close", (code) => {
          if (code === 0 && fs.existsSync(outputPath)) {
            const stats = fs.statSync(outputPath);
            resolve({
              success: true,
              result: {
                audioPath: outputPath,
                duration: this.estimateAudioDuration(text),
                timestamp: new Date(),
              },
            });
          } else {
            resolve({
              success: false,
              error: error || `TTS process exited with code ${code}`,
            });
          }
        });
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Synthesis failed",
      };
    }
  }

  async recognizeAudio(
    audioPath: string,
  ): Promise<{ success: boolean; result?: RecognitionResult; error?: string }> {
    if (!this.status.sttReady) {
      return { success: false, error: "STT engine not ready" };
    }

    if (!fs.existsSync(audioPath)) {
      return { success: false, error: "Audio file not found" };
    }

    try {
      return new Promise((resolve) => {
        const enginePath = this.getSTTEnginePath();
        const process = spawn(enginePath, [
          "--model",
          this.getSTTModelPath(),
          "--audio",
          audioPath,
          "--language",
          this.config.language,
        ]);

        let output = "";
        let error = "";

        process.stdout.on("data", (data) => {
          output += data.toString();
        });

        process.stderr.on("data", (data) => {
          error += data.toString();
        });

        process.on("close", (code) => {
          if (code === 0) {
            const result = this.parseSTTOutput(output);
            this.status.processedAudio++;
            resolve({
              success: true,
              result: {
                text: result.text,
                confidence: result.confidence,
                timestamp: new Date(),
                duration: this.getAudioDuration(audioPath),
              },
            });
          } else {
            resolve({
              success: false,
              error: error || `STT process exited with code ${code}`,
            });
          }
        });
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Recognition failed",
      };
    }
  }

  async testVoiceEngine(): Promise<{ success: boolean; error?: string }> {
    try {
      // Test TTS
      const ttsTest = await this.synthesizeText(
        "Тестирование голосового движка",
      );
      if (!ttsTest.success) {
        return { success: false, error: `TTS Test Failed: ${ttsTest.error}` };
      }

      // Test STT with synthesized audio
      if (ttsTest.result) {
        const sttTest = await this.recognizeAudio(ttsTest.result.audioPath);

        // Cleanup test file
        if (fs.existsSync(ttsTest.result.audioPath)) {
          fs.unlinkSync(ttsTest.result.audioPath);
        }

        if (!sttTest.success) {
          return { success: false, error: `STT Test Failed: ${sttTest.error}` };
        }
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Voice engine test failed",
      };
    }
  }

  getStatus(): VoiceStatus {
    return { ...this.status };
  }

  updateConfig(config: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...config };
    this.emit("configUpdated", this.config);
  }

  private getTTSEnginePath(): string {
    const engines = {
      coqui: "/usr/local/bin/tts",
      mozilla: "/usr/local/bin/mozilla-tts",
      silero: "/usr/local/bin/silero-tts",
    };
    return engines[this.config.ttsEngine] || "/usr/local/bin/tts";
  }

  private getSTTEnginePath(): string {
    const engines = {
      vosk: "/usr/local/bin/vosk-transcriber",
      whisper: "/usr/local/bin/whisper",
      silero: "/usr/local/bin/silero-stt",
    };
    return engines[this.config.sttEngine] || "/usr/local/bin/vosk-transcriber";
  }

  private getSTTModelPath(): string {
    return `/models/${this.config.sttEngine}/${this.config.language}`;
  }

  private estimateAudioDuration(text: string): number {
    // Estimate 150 words per minute average speech rate
    const words = text.split(" ").length;
    return (words / 150) * 60 * this.config.speechRate;
  }

  private getAudioDuration(audioPath: string): number {
    // In real implementation, use ffprobe or similar
    return 1.0; // Placeholder
  }

  private parseSTTOutput(output: string): { text: string; confidence: number } {
    try {
      const parsed = JSON.parse(output);
      return {
        text: parsed.text || output.trim(),
        confidence: parsed.confidence || 0.9,
      };
    } catch {
      return {
        text: output.trim(),
        confidence: 0.85,
      };
    }
  }
}

export const voiceService = new VoiceService();
