import { create } from "zustand";

interface userLeftMenuState {
  userLeftSelected: string;
  setUserLeftSelected: (leftSelectedItems: string) => void;
}
export const useUserLeftMenuStore = create<userLeftMenuState>((set) => ({
  userLeftSelected: "1",
  setUserLeftSelected: (val) => set((state) => ({ userLeftSelected: val })),
}));
