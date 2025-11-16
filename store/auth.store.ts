import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@sentry/react-native";
import { create } from "zustand";
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (User: User | null) => void;
  setLoading: (loading: boolean) => void;
  fetchAuthenticatedUser: () => void;
};
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  setIsAuthenticated(value) {
    set({ isAuthenticated: value });
  },
  setUser(user) {
    set({ user });
  },
  setLoading(value) {
    set({ isLoading: value });
  },
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ user: user as User, isAuthenticated: true });
      } else set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.log(error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default useAuthStore;
