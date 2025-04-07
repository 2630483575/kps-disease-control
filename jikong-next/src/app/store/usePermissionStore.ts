import { create } from "zustand";

interface permissionLeftMenuState {
  permissionLeftSelected: string;
  setPermissionLeftSelected: (leftSelectedItems: string) => void;
}
export const useDictLeftMenuStore = create<permissionLeftMenuState>((set) => ({
  permissionLeftSelected: "1",
  setPermissionLeftSelected: (val) =>
    set((state) => ({ permissionLeftSelected: val })),
}));
