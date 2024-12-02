import { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    isLoggedIn: false,
  },
  setUser: (user) => {
    set({
      user,
    });
  },
}));
