"use client";

import React from "react";
import { AgentId } from "@/components/orb/useOrbState";
import { Orb } from "@/components/orb/orb";
import { VoiceAgent } from "@/components/voice/voiceAgent";
import { SitePage, agents } from "@/lib/knowledge";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";

interface PracticeConsoleProps {
  agentId: AgentId;
  activeModule: SitePage | null;
  onBack: () => void;
}

export function PracticeConsole({
  agentId,
  activeModule,
  onBack,
}: PracticeConsoleProps) {
  const agent = agents[agentId] || agents.neha;

  return (
    <div className="flex-1 flex flex-col h-screen bg-black overflow-hidden relative">
      {/* Background ambient light */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[140px] opacity-10 pointer-events-none transition-all duration-1000 bg-gradient-to-tr ${agent.accentColor}`}
      />

      {/* Top Header */}
      <header className="h-16 border-b border-neutral-900 px-6 flex items-center justify-between shrink-0 bg-neutral-950/40 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Exit Workspace</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Workspace Active — {agent.name}</span>
        </div>
      </header>

      {/* Main Center Content (Orb Console) */}
      <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col items-center justify-center pt-2 pb-0 px-6 md:pt-4 md:pb-0 md:px-12 relative z-10">
        <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-8 select-none">
          
          {/* Visual description and active topic */}
          <div className="text-center space-y-2">
            <span className="text-xs text-neutral-500 uppercase tracking-wider font-bold">
              Voice Assistant Status
            </span>
            <h3 className="text-lg font-medium text-neutral-200">
              Talk to {agent.name}
            </h3>
            {activeModule && (
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Topic: <span className="text-indigo-400 font-semibold">{activeModule.title}</span>
              </p>
            )}
          </div>

          {/* Interactive ORB */}
          <Orb />

          {/* Voice Connect Button / Status */}
          <div className="w-full">
            <VoiceAgent />
          </div>
        </div>
      </div>
    </div>
  );
}
