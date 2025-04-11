import { create } from "zustand";
import { leftRoleMenu } from "../types/role";

interface roleLeftMenuState {
  roleLeftSelected: number;
  leftRoleMenu: leftRoleMenu[];
  tabSelected: string;
  setRoleLeftSelected: (leftSelectedItems: number) => void;
  setLeftRoleMenu: (leftMenuOptions: leftRoleMenu[]) => void;
  setTabSelected: (selectedItems: string) => void;
}
export const useRoleLeftMenuStore = create<roleLeftMenuState>((set) => ({
  roleLeftSelected: 0,
  leftRoleMenu: [],
  tabSelected: "roleInfo",
  setRoleLeftSelected: (val) => set((state) => ({ roleLeftSelected: val })),
  setLeftRoleMenu: (val) => set((state) => ({ leftRoleMenu: val })),
  setTabSelected: (val) => set((state) => ({ tabSelected: val })),
}));
