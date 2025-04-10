import { create } from "zustand";
import { leftRoleMenu } from "../types/role";

interface roleLeftMenuState {
  roleLeftSelected: number;
  leftRoleMenu: leftRoleMenu[];
  setRoleLeftSelected: (leftSelectedItems: number) => void;
  setLeftRoleMenu: (leftMenuOptions: leftRoleMenu[]) => void;
}
export const useRoleLeftMenuStore = create<roleLeftMenuState>((set) => ({
  roleLeftSelected: 1,
  leftRoleMenu: [],
  setRoleLeftSelected: (val) => set((state) => ({ roleLeftSelected: val })),
  setLeftRoleMenu: (val) => set((state) => ({ leftRoleMenu: val })),
}));
