import { create } from "zustand";
import { leftRoleMenu } from "../types/role";

interface roleLeftMenuState {
  roleLeftSelected: number;
  leftRoleMenu: leftRoleMenu[];
  tabSelected: string;
  canEditRoleList: number[];
  needUpdateRoleList: boolean;
  setRoleLeftSelected: (leftSelectedItems: number) => void;
  setLeftRoleMenu: (leftMenuOptions: leftRoleMenu[]) => void;
  setTabSelected: (selectedItems: string) => void;
  setCanEditRoleList: (canEditList: number[]) => void;
  setNeedUpdateRoleList: (canEdit: boolean) => void;
}
export const useRoleLeftMenuStore = create<roleLeftMenuState>((set) => ({
  roleLeftSelected: 0,
  leftRoleMenu: [],
  tabSelected: "roleInfo",
  canEditRoleList: [],
  needUpdateRoleList: false,
  setRoleLeftSelected: (val) => set((state) => ({ roleLeftSelected: val })),
  setLeftRoleMenu: (val) => set((state) => ({ leftRoleMenu: val })),
  setTabSelected: (val) => set((state) => ({ tabSelected: val })),
  setCanEditRoleList: (val) => set((state) => ({ canEditRoleList: val })),
  setNeedUpdateRoleList: (val) => set((state) => ({ needUpdateRoleList: val })),
}));
