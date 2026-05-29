import { create } from "zustand";

export type OrbState = "idle" | "listening" | "thinking" | "speaking";

type Store = { state: OrbState; set: (s: OrbState) => void };

export const useOrbState = create<Store>((set) => ({
  state: "idle",
  set: (state) => set({ state }),
}));