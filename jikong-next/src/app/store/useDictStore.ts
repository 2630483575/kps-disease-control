import { create } from "zustand";
import { leftDictMenu } from "../types/dict";

interface dictLeftMenuState {
  dictLeftSelected: number;
  dictTypeSelected: number;
  dictLeftMenu: leftDictMenu[];
  setDictLeftSelected: (leftSelectedItems: number) => void;
  setDictTypeSelected: (leftSelectedItems: number) => void;
  setDictLeftMenu: (leftMenuOptions: leftDictMenu[]) => void;
}
export const useDictLeftMenuStore = create<dictLeftMenuState>((set) => ({
  dictLeftSelected: 1,
  dictTypeSelected: 1,
  dictLeftMenu: [],
  setDictLeftSelected: (val) => set((state) => ({ dictLeftSelected: val })),
  setDictTypeSelected: (val) => set((state) => ({ dictTypeSelected: val })),
  setDictLeftMenu: (val) => set(() => ({ dictLeftMenu: val })),
}));
