"use client";

import React, { useState, useRef, useEffect } from "react";
import { useOrbState } from "../orb/useOrbState";
import { createLiveClient } from "@/lib/gemini";
import { getAudioWorkletBlobUrl } from "./audioWorklet";
import { buildSystemInstruction } from "@/lib/systemprompt";
import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";

export function VoiceAgent() {
  const { state, setState, setVolume } = useOrbState();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // References to Web Audio components
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // References to WebSocket session and playback
  const sessionRef = useRef<any>(null);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);
  const stateRef = useRef(state);
  const isSessionActiveRef = useRef(false);

  // Keep stateRef up to date for closure functions
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Clean up all audio resources and connections on unmount
  useEffect(() => {
    return () => {
      cleanupSession();
    };
  }, []);

  // Decodes base64 PCM 24kHz data into Float32 samples
  const base64ToFloat32 = (base64: string): Float32Array => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const uint8View = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      uint8View[i] = binaryString.charCodeAt(i);
    }
    const int16View = new Int16Array(buffer);
    const float32View = new Float32Array(int16View.length);
    for (let i = 0; i < int16View.length; i++) {
      float32View[i] = int16View[i] / 32768.0;
    }
    return float32View;
  };

  // Converts ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Stops all queued and currently playing audio nodes
  const stopAllPlayback = () => {
    scheduledSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore if already stopped
      }
    });
    scheduledSourcesRef.current = [];
    nextPlayTimeRef.current = 0;
    setVolume(0);
  };

  // Monitor real-time playback volume of the speaker
  const monitorPlaybackVolume = () => {
    if (!analyserRef.current || stateRef.current !== "speaking") {
      setVolume(0);
      return;
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const val = (dataArray[i] - 128) / 128.0;
      sum += val * val;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    
    // Animate speaking volume dynamically
    setVolume(Math.min(1, rms * 4));

    if (stateRef.current === "speaking") {
      requestAnimationFrame(monitorPlaybackVolume);
    }
  };

  // Queues model's response audio chunk for gapless playback
  const queueAudioForPlayback = (base64Audio: string) => {
    if (!outputContextRef.current || !analyserRef.current) return;

    const ctx = outputContextRef.current;
    const float32Samples = base64ToFloat32(base64Audio);

    // Create 24kHz Mono AudioBuffer
    const audioBuffer = ctx.createBuffer(1, float32Samples.length, 24000);
    audioBuffer.getChannelData(0).set(float32Samples);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    // Connect source to analyser instead of destination directly
    source.connect(analyserRef.current);

    const currentTime = ctx.currentTime;
    let startTime = nextPlayTimeRef.current;

    if (startTime < currentTime) {
      startTime = currentTime + 0.05; // tiny buffer to avoid initial clicks
    }

    source.start(startTime);
    nextPlayTimeRef.current = startTime + audioBuffer.duration;

    scheduledSourcesRef.current.push(source);

    // If we transition to speaking, start the visual monitor loop
    if (stateRef.current !== "speaking") {
      setState("speaking");
      setTimeout(monitorPlaybackVolume, 50);
    }

    source.onended = () => {
      // Remove from active list
      scheduledSourcesRef.current = scheduledSourcesRef.current.filter((s) => s !== source);
      
      // If nothing left in queue, go back to listening/idle state
      if (scheduledSourcesRef.current.length === 0 && stateRef.current === "speaking") {
        setState("listening");
        setVolume(0);
      }
    };
  };

  // Handles raw server WebSocket messages
  const handleServerMessage = (message: any) => {
    // 1. Model response content (audio chunks)
    if (message.serverContent?.modelTurn?.parts) {
      for (const part of message.serverContent.modelTurn.parts) {
        if (part.inlineData && part.inlineData.data) {
          queueAudioForPlayback(part.inlineData.data);
        }
      }
    }

    // 2. Interruption detection (VAD or user barge-in)
    if (message.serverContent?.interrupted) {
      stopAllPlayback();
      setState("listening");
    }

    // 3. Turn complete
    if (message.serverContent?.turnComplete) {
      // If we finished receiving the model turn and nothing is playing, return to listening
      if (scheduledSourcesRef.current.length === 0 && stateRef.current === "speaking") {
        setState("listening");
        setVolume(0);
      }
    }
  };

  const cleanupSession = () => {
    isSessionActiveRef.current = false;

    // Stop the recording worklet FIRST. Removing its message handler and
    // disconnecting it ensures no trailing audio chunks are sent to a
    // WebSocket that is already closing (which triggers the browser's
    // "WebSocket is already in CLOSING or CLOSED state" warning).
    if (workletNodeRef.current) {
      workletNodeRef.current.port.onmessage = null;
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    // Disconnect websocket
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {}
      sessionRef.current = null;
    }

    // Stop mic stream
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }

    // Close contexts
    if (inputContextRef.current) {
      inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (outputContextRef.current) {
      outputContextRef.current.close();
      outputContextRef.current = null;
    }

    analyserRef.current = null;
    stopAllPlayback();
    setState("idle");
    setVolume(0);
    setIsConnected(false);
    setIsConnecting(false);
  };

  const startSession = async () => {
    setErrorMsg(null);
    setIsConnecting(true);
    setState("thinking");

    try {
      // Check for secure context and AudioContext support
      if (typeof window !== "undefined") {
        if (!window.isSecureContext && window.location.hostname !== "localhost") {
          throw new Error("The Live Voice Assistant requires a secure context (https:// or http://localhost). Please open the application via http://localhost:3000.");
        }
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          throw new Error("Web Audio API is not supported in this browser.");
        }
      }

      // 1. Request microphone permissions first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      // 2. Fetch ephemeral token from Next.js server route
      const response = await fetch("/api/gemini-token", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to retrieve authentication token from server.");
      }
      const { token } = await response.json();

      // 3. Initialize GoogleGenAI client with the token
      const ai = createLiveClient(token);

      // 4. Connect to Gemini Live API WebSocket
      const model = process.env.NEXT_PUBLIC_GEMINI_LIVE_MODEL || "gemini-3.1-flash-live-preview";
      
      // const session = await ai.live.connect({
      //   model: model,
      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: ["AUDIO" as any],
          systemInstruction: {
            parts: [{ text: buildSystemInstruction() }],
          },
        },
        callbacks: {
          onopen: () => {
            isSessionActiveRef.current = true;
            setIsConnected(true);
            setIsConnecting(false);
            setState("listening");
          },
          onmessage: handleServerMessage,
          onerror: (err: any) => {
            console.error("Gemini Live Error:", err);
            setErrorMsg(err.message || "An error occurred with the Gemini Live API connection.");
            isSessionActiveRef.current = false;
            cleanupSession();
          },
          onclose: (event: any) => {
            console.log("Gemini Live Connection Closed. Code:", event?.code, "Reason:", event?.reason, "Clean:", event?.wasClean);
            isSessionActiveRef.current = false;
            if (event && !event.wasClean && event.code !== 1000 && event.code !== 1005) {
              setErrorMsg(`Gemini Live connection closed. Code: ${event.code}. Reason: ${event.reason || "No reason provided"}.`);
            }
            cleanupSession();
          },
        },
      });

      sessionRef.current = session;

      // 5. Initialize Input (Recording) Audio Context (16kHz)
      const inputContext = new AudioContext({ sampleRate: 16000 });
      inputContextRef.current = inputContext;

      if (!inputContext.audioWorklet) {
        throw new Error("Web Audio Worklets are not supported or blocked in this browser environment.");
      }

      // Load PCM downsampler worklet module
      const blobUrl = getAudioWorkletBlobUrl();
      await inputContext.audioWorklet.addModule(blobUrl);

      const sourceNode = inputContext.createMediaStreamSource(stream);
      const workletNode = new AudioWorkletNode(inputContext, "pcm-processor");

      // Set up worklet message routing
      workletNode.port.onmessage = (event: MessageEvent) => {
        if (!isSessionActiveRef.current || !sessionRef.current || stateRef.current === "thinking") return;

        const pcmBuffer = event.data; // ArrayBuffer
        const base64Audio = arrayBufferToBase64(pcmBuffer);

        // Send raw PCM bytes to Gemini Live
        try {
          sessionRef.current.sendRealtimeInput({
            audio: {
              data: base64Audio,
              mimeType: "audio/pcm;rate=16000",
            },
          });
        } catch (e) {
          console.error("Failed to send audio chunk to server:", e);
        }

        // Visualize user's voice real-time volume in Orb (only when listening/recording)
        if (stateRef.current === "listening") {
          const int16Array = new Int16Array(pcmBuffer);
          let sum = 0;
          for (let i = 0; i < int16Array.length; i++) {
            const sample = int16Array[i] / 32768.0;
            sum += sample * sample;
          }
          const rms = Math.sqrt(sum / int16Array.length);
          setVolume(Math.min(1, rms * 5.5)); // amplify slightly for better visuals
        }
      };

      sourceNode.connect(workletNode);
      workletNodeRef.current = workletNode;

      // 6. Initialize Output (Playback) Audio Context (24kHz)
      const outputContext = new AudioContext({ sampleRate: 24000 });
      outputContextRef.current = outputContext;

      // Create analyser for model speaking visual feedback
      const analyser = outputContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.connect(outputContext.destination);
      analyserRef.current = analyser;

    } catch (err: any) {
      console.error("Start Session Error:", err);
      setErrorMsg(err.message || "Failed to initialize microphone or WebSocket session.");
      cleanupSession();
    }
  };

  const handleToggleConnection = () => {
    if (isConnected || isConnecting) {
      cleanupSession();
    } else {
      startSession();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Control Button */}
      <button
        onClick={handleToggleConnection}
        disabled={isConnecting}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${
          isConnected
            ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isConnecting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Connecting...</span>
          </>
        ) : isConnected ? (
          <>
            <PhoneOff className="w-5 h-5" />
            <span>Disconnect</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>Connect Assistant</span>
          </>
        )}
      </button>

      {/* Error Message Display */}
      {errorMsg && (
        <div className="text-red-400 text-xs mt-2 max-w-xs text-center border border-red-500/20 bg-red-950/20 px-3 py-1.5 rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Action Prompt */}
      {isConnected && !isConnecting && (
        <div className="text-xs opacity-50 mt-1 flex items-center gap-1.5 animate-pulse text-indigo-200">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span>
            {state === "listening" && "Go ahead, say something!"}
            {state === "thinking" && "Gemini is processing..."}
            {state === "speaking" && "Gemini is speaking..."}
          </span>
        </div>
      )}
    </div>
  );
}