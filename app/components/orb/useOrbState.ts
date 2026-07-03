import { create } from "zustand";

export type OrbState = "idle" | "listening" | "thinking" | "speaking";
export type AgentId = "neha" | "amit" | "karan";

type Store = {
  state: OrbState;
  volume: number;
  agentId: AgentId;
  setState: (s: OrbState) => void;
  setVolume: (v: number) => void;
  setAgentId: (id: AgentId) => void;
};

export const useOrbState = create<Store>((set) => ({
  state: "idle",
  volume: 0,
  agentId: "neha",
  setState: (state) => set({ state }),
  setVolume: (volume) => set({ volume }),
  setAgentId: (agentId) => set({ agentId }),
}));