import { create } from "zustand";

interface dictLeftMenuState {
  dictLeftSelected: string;
  dictTypeSelected: string;
  setDictLeftSelected: (leftSelectedItems: string) => void;
  setDictTypeSelected: (leftSelectedItems: string) => void;
}
export const useDictLeftMenuStore = create<dictLeftMenuState>((set) => ({
  dictLeftSelected: "1",
  dictTypeSelected: "1",
  setDictLeftSelected: (val) => set((state) => ({ dictLeftSelected: val })),
  setDictTypeSelected: (val) => set((state) => ({ dictTypeSelected: val })),
}));
