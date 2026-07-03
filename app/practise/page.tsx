"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useOrbState, AgentId } from "@/components/orb/useOrbState";
import { AgentSidebar } from "@/components/practise/AgentSidebar";
import { PracticeConsole } from "@/components/practise/PracticeConsole";
import { agents, pageIndex, SitePage } from "@/lib/knowledge";
import { useRouter, useSearchParams } from "next/navigation";

function PracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { agentId, setAgentId } = useOrbState();
  const [activeModule, setActiveModule] = useState<SitePage | null>(null);

  // Sync agentId from URL search query on mount/change
  useEffect(() => {
    const queryAgent = searchParams.get("agent") as AgentId;
    if (queryAgent && agents[queryAgent]) {
      setAgentId(queryAgent);
    }
  }, [searchParams, setAgentId]);

  // Set the default active module to the first page (Overview) if none is selected
  useEffect(() => {
    if (!activeModule && pageIndex.length > 0) {
      setActiveModule(pageIndex[0]);
    }
  }, [activeModule]);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Sidebar: Agent Intro & Scrollable Module Index */}
      <AgentSidebar
        agentId={agentId}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
      />

      {/* Main Console: Module Details & Voice ORB */}
      <PracticeConsole
        agentId={agentId}
        activeModule={activeModule}
        onBack={() => router.push("/preview")}
      />
    </div>
  );
}

export default function PractisePage() {
  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden font-sans">
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-neutral-400">Loading Practice Room...</p>
            </div>
          </div>
        }
      >
        <PracticeContent />
      </Suspense>
    </main>
  );
}
