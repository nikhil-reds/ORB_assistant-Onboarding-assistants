import { create } from "zustand";

export type OrbState = "idle" | "listening" | "thinking" | "speaking";

type Store = {
  state: OrbState;
  volume: number;
  setState: (s: OrbState) => void;
  setVolume: (v: number) => void;
};

export const useOrbState = create<Store>((set) => ({
  state: "idle",
  volume: 0,
  setState: (state) => set({ state }),
  setVolume: (volume) => set({ volume }),
}));