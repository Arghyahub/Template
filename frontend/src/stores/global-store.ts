import { create } from "zustand";

interface State {
  refreshToken?: string;
  setRefreshToken: (token: string) => void;
  clearRefreshToken: () => void;
}

const useGlobalStore = create<State>((set) => ({
  refreshToken: undefined,
  setRefreshToken: (token) => set({ refreshToken: token }),
  clearRefreshToken: () => set({ refreshToken: undefined }),
}));

export default useGlobalStore;
