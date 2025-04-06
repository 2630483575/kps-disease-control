import { create } from "zustand";

interface SideMenuState {
  sideSelected: string;
  setSideSelected: (selectedItems: string) => void;
}
export const useSideStore = create<SideMenuState>((set) => ({
  sideSelected: "userManage",
  setSideSelected: (val) => set((state) => ({ sideSelected: val })),
}));
