"use client";

import React from "react";
import { useOrbState, AgentId } from "@/components/orb/useOrbState";
import { agents } from "@/lib/knowledge";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const router = useRouter();
  const { setAgentId } = useOrbState();

  const handleStartPracticing = (id: AgentId) => {
    setAgentId(id);
    router.push(`/practise?agent=${id}`);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-white relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-4 pb-0 md:pt-6 md:pb-0 relative z-10 flex flex-col justify-center min-h-screen">
        {/* Header & Description */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Voice Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400"
          >
            Select Your Practice Agent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-400 leading-relaxed"
          >
            Hone your communication and master FutureTech Solutions HR workflows by talking to our customized, real-time AI agents. Select an agent specializing in your topic of interest and click "Start Practicing" to connect.
          </motion.p>
        </div>

        {/* 3 Agents Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {(Object.keys(agents) as AgentId[]).map((key) => {
            const agent = agents[key];
            return (
              <div
                key={key}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950/60 p-8 transition-all duration-500 hover:border-neutral-700/80 hover:translate-y-[-4px] overflow-hidden"
              >
                {/* Decorative glow inside card on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Card Header with Avatar */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
                      {agent.avatar}
                    </span>
                    <div
                      className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${agent.accentColor} animate-pulse`}
                    />
                  </div>

                  {/* Agent Info */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all duration-300">
                      {agent.name}
                    </h3>
                    <p
                      className={`text-xs font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r ${agent.accentColor}`}
                    >
                      {agent.title}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {agent.role}
                  </p>

                  {/* Expertise Checklist */}
                  <div className="space-y-2 pt-2 border-t border-neutral-900">
                    <p className="text-xs font-medium text-neutral-500 tracking-wider uppercase">
                      Areas of Expertise
                    </p>
                    <ul className="space-y-1.5">
                      {agent.expertise.map((exp) => (
                        <li key={exp} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practice Button */}
                <div className="pt-8 relative z-10">
                  <button
                    onClick={() => handleStartPracticing(key)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-md group-hover:scale-[1.02] cursor-pointer text-sm bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white hover:bg-neutral-850"
                  >
                    <span>Start Practicing</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
