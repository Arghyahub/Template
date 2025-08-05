import RoleEntity from "@/types/entities/role-entity";
import { create } from "zustand";

interface UserStore {
  user?: {
    id: number;
    name: string;
    email: string;
    user_type: string;
    access_role: RoleEntity;
  };
  setUser: (user: UserStore["user"]) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
