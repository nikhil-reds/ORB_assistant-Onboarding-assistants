"use client";

import React from "react";
import { AgentId, useOrbState } from "@/components/orb/useOrbState";
import { agents, pageIndex, SitePage, getAgentModules } from "@/lib/knowledge";
import { CheckCircle2, BookOpen, RefreshCw } from "lucide-react";

interface AgentSidebarProps {
  agentId: AgentId;
  activeModule: SitePage | null;
  onSelectModule: (module: SitePage) => void;
}

export function AgentSidebar({
  agentId,
  activeModule,
  onSelectModule,
}: AgentSidebarProps) {
  const { completedModuleSlugs, resetCompletedModules } = useOrbState();

  const getAgentColor = (id: string) => {
    if (id === "nikhil") return "text-blue-400";
    if (id === "tripti") return "text-purple-400";
    return "text-emerald-400";
  };

  const getAgentBg = (id: string) => {
    if (id === "nikhil") return "bg-blue-950/20 border-blue-900/30 hover:border-blue-800/50";
    if (id === "tripti") return "bg-purple-950/20 border-purple-900/30 hover:border-purple-800/50";
    return "bg-emerald-950/20 border-emerald-900/30 hover:border-emerald-800/50";
  };
  const agent = agents[agentId] || agents.jiya;

  return (
    <aside className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-950 flex flex-col h-full md:h-screen shrink-0 overflow-hidden">
      {/* Top Section: Agent Intro */}
      <div className="pt-3 pb-3 px-6 border-b border-neutral-900 bg-neutral-950/80 space-y-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-4xl filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.15)]">
            {agent.avatar}
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
              {agent.name}
            </h2>
            <p
              className={`text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${agent.accentColor}`}
            >
              {agent.title}
            </p>
          </div>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed font-light bg-neutral-900/30 p-3 rounded-xl border border-neutral-900">
          {agent.role}
        </p>

        <div className="bg-neutral-900/20 border border-neutral-800/40 p-3.5 rounded-xl">
          <p className="text-[10px] text-neutral-500 font-semibold tracking-wider uppercase mb-1">
            Greeting statement
          </p>
          <p className="text-xs italic text-neutral-300 font-light line-clamp-3">
            "{agent.openingStatement}"
          </p>
        </div>
      </div>

      {/* Bottom Section: Modules in the Index */}
      <div className="flex-1 flex flex-col min-h-0 bg-neutral-950/20">
        <div className="p-4 border-b border-neutral-900 shrink-0 flex items-center justify-between text-neutral-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Practice Modules ({getAgentModules(agentId).length})
            </span>
          </div>
          {completedModuleSlugs.length > 0 && (
            <button
              onClick={resetCompletedModules}
              className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 transition-transform duration-300 hover:rotate-180" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Scrollable vertical list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {getAgentModules(agentId).map((module) => {
            const isActive = activeModule?.slug === module.slug;
            const isCompleted = completedModuleSlugs.includes(module.slug);
            return (
              <button
                key={module.slug}
                onClick={() => onSelectModule(module)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 relative group cursor-pointer overflow-hidden ${
                  isActive
                    ? `bg-neutral-900 border-neutral-700/80 shadow-md ${agent.shadowColor}`
                    : isCompleted
                    ? getAgentBg(agentId)
                    : "bg-neutral-950/40 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/20"
                }`}
              >
                {/* Accent line for active module */}
                {isActive && (
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${agent.accentColor}`}
                  />
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        {module.title}
                      </h4>
                      {isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-gradient-to-r ${agent.accentColor}`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${agent.accentColor}`}></span>
                        </span>
                      )}
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${getAgentColor(agentId)}`} />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-light">
                    {module.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        /* Minimalist Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </aside>
  );
}
