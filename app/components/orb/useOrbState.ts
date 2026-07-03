import { create } from "zustand";

export type OrbState = "idle" | "listening" | "thinking" | "speaking";
export type AgentId = "jiya" | "nikhil" | "tripti";

type Store = {
  state: OrbState;
  volume: number;
  agentId: AgentId;
  activeModuleSlug: string | null;
  completedModuleSlugs: string[];
  lastActionSource: "user" | "agent" | null;
  setState: (s: OrbState) => void;
  setVolume: (v: number) => void;
  setAgentId: (id: AgentId) => void;
  setActiveModuleSlug: (slug: string | null, source?: "user" | "agent") => void;
  markModuleCompleted: (slug: string) => void;
  markModuleIncomplete: (slug: string) => void;
  resetCompletedModules: () => void;
};

export const useOrbState = create<Store>((set) => ({
  state: "idle",
  volume: 0,
  agentId: "jiya",
  activeModuleSlug: null,
  completedModuleSlugs: [],
  lastActionSource: null,
  setState: (state) => set({ state }),
  setVolume: (volume) => set({ volume }),
  setAgentId: (agentId) => set({ agentId }),
  setActiveModuleSlug: (slug, source = "agent") =>
    set({ activeModuleSlug: slug, lastActionSource: source }),
  markModuleCompleted: (slug) =>
    set((state) => ({
      completedModuleSlugs: state.completedModuleSlugs.includes(slug)
        ? state.completedModuleSlugs
        : [...state.completedModuleSlugs, slug],
    })),
  markModuleIncomplete: (slug) =>
    set((state) => ({
      completedModuleSlugs: state.completedModuleSlugs.filter((s) => s !== slug),
    })),
  resetCompletedModules: () => set({ completedModuleSlugs: [] }),
}));