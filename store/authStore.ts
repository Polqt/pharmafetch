import { Models } from "react-native-appwrite";
import { create } from "zustand";

interface AuthState {
  user: Models.Document | null;
  isAuthenticated: boolean;
  setUser: (user: Models.Document | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
