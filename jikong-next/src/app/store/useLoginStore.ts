import { create } from "zustand";

interface loginUserType {
  loginId?: string;
  userName?: string;
  password?: string;
}

interface loginUserState {
  loginUserInfo: loginUserType;
  setLoginUserInfo: (userNameInfo: loginUserType) => void;
}
export const useLoginUserStore = create<loginUserState>((set) => ({
  loginUserInfo: {},
  setLoginUserInfo: (val) => set((state) => ({ loginUserInfo: val })),
}));
