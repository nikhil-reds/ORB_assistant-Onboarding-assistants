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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-white relative overflow-hidden font-sans flex flex-col justify-center">
      
      {/* Background Ambient Organic Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-emerald-950/5 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10 w-full flex flex-col justify-center min-h-screen">
        
        {/* Header & Description */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-medium uppercase tracking-wider mb-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Interactive Voice Platform
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400"
          >
            Select Your Practice Agent
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-zinc-400 leading-relaxed font-light"
          >
            Hone your communication and master FutureTech Solutions HR workflows by talking to our customized, real-time AI agents. Select an agent specializing in your topic of interest and click "Start Practicing" to connect.
          </motion.p>
        </div>

        {/* 3 Agents Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {(Object.keys(agents) as AgentId[]).map((key) => {
            const agent = agents[key];
            return (
              <motion.div
                key={key}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-zinc-800/80 to-zinc-950/20 hover:from-zinc-700/80 hover:to-zinc-800/20 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Frosted Glass Background Card */}
                <div className="h-full w-full bg-zinc-950/80 backdrop-blur-xl p-8 rounded-[23px] flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-6 relative z-10 flex-1 flex flex-col">
                    {/* Card Header with Avatar and Breathing Status Dot */}
                    <div className="flex items-center justify-between">
                      <span className="text-4xl filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.12)] select-none">
                        {agent.avatar}
                      </span>
                      
                      {/* Breathing Pulse Dot */}
                      <div className="relative flex items-center justify-center w-4 h-4" aria-label="Status Indicator">
                        <motion.span
                          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className={`absolute w-full h-full rounded-full bg-gradient-to-r ${agent.accentColor}`}
                        />
                        <span className={`relative w-2.5 h-2.5 rounded-full bg-gradient-to-r ${agent.accentColor} shadow-md`} />
                      </div>
                    </div>

                    {/* Agent Identification */}
                    <div className="space-y-1">
                      <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                        {agent.name}
                      </h3>
                      <p
                        className={`text-xs font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r ${agent.accentColor}`}
                      >
                        {agent.title}
                      </p>
                    </div>

                    {/* Description Role */}
                    <p className="text-sm text-zinc-400 leading-relaxed font-light flex-1">
                      {agent.role}
                    </p>

                    {/* Expertise Checklist */}
                    <div className="space-y-3 pt-4 border-t border-zinc-900">
                      <p className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">
                        Areas of Expertise
                      </p>
                      <ul className="space-y-2">
                        {agent.expertise.map((exp) => (
                          <li key={exp} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Start Practicing CTA Button */}
                  <div className="pt-8 relative z-10 shrink-0">
                    <button
                      onClick={() => handleStartPracticing(key)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white group-hover:bg-gradient-to-r group-hover:from-zinc-100 group-hover:to-zinc-200 group-hover:text-zinc-950 group-hover:border-transparent group-hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer text-sm"
                    >
                      <span>Start Practicing</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
