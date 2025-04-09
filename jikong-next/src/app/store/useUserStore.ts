import { create } from "zustand";
import { leftDepMenu } from "../types/dep";

interface userLeftMenuState {
  // 左边选中部门
  userLeftSelected: number;
  // 左边选中对应的组织
  userLeftGroupSelected: number;
  // 左边部门菜单
  userLeftMenu: leftDepMenu[];
  setUserLeftSelected: (leftSelectedItems: number) => void;
  setUserLeftMenu: (leftMenuOptions: leftDepMenu[]) => void;
  setUserLeftGroupSelected: (leftGroupSelectedItems: number) => void;
}
export const useUserLeftMenuStore = create<userLeftMenuState>((set) => ({
  userLeftSelected: 1,
  userLeftMenu: [],
  userLeftGroupSelected: 1,
  setUserLeftSelected: (val) => set(() => ({ userLeftSelected: val })),
  setUserLeftMenu: (val) => set(() => ({ userLeftMenu: val })),
  setUserLeftGroupSelected: (val) =>
    set(() => ({ userLeftGroupSelected: val })),
}));
