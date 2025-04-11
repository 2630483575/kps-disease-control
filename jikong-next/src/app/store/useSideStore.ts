import { create } from "zustand";
import { IsideMenu } from "../types/side";

interface SideMenuState {
  sideSelected: string;
  sideMenu: IsideMenu[];
  setSideSelected: (selectedItems: string) => void;
  setSideMenu: (sideItems: IsideMenu[]) => void;
}
export const useSideStore = create<SideMenuState>((set) => ({
  sideSelected: "",
  sideMenu: [],
  setSideSelected: (val) => set((state) => ({ sideSelected: val })),
  setSideMenu: (val) => set((state) => ({ sideMenu: val })),
}));
