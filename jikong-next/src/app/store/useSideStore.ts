import { create } from "zustand";
import { IsideMenu } from "../types/side";

interface SideMenuState {
  sideSelected: string;
  activeOpenKeys: string[];
  sideMenu: IsideMenu[];
  setSideSelected: (selectedItems: string) => void;
  setSideMenu: (sideItems: IsideMenu[]) => void;
  setActiveOpenKeys: (openItems: string[]) => void;
}
export const useSideStore = create<SideMenuState>((set) => ({
  sideSelected: "User",
  activeOpenKeys: [],
  sideMenu: [],
  setSideSelected: (val) => set((state) => ({ sideSelected: val })),
  setSideMenu: (val) => set((state) => ({ sideMenu: val })),
  setActiveOpenKeys: (val) => set((state) => ({ activeOpenKeys: val })),
}));
