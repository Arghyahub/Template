import { create } from "zustand";

interface State {
  name?: string;
  email?: string;
  id?: string;
  setState: (name: string, email: string, id: string) => void;
}

const userStore = create<State>((set) => ({
  name: null,
  email: null,
  id: null,
  setState: (name, email, id) => set({ name, email, id }),
}));

export default userStore;
