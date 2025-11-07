import { createUser, getCurrentUser, signIn, signOut } from "@/lib/appwrite";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser, clearAuth } = useAuthStore();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 6 * 5,
  });

  const signUpMutation = useMutation({
    mutationFn: (params: CreateUserParams) => createUser(params),
    onSuccess: async (data) => {
      setUser(data);
      queryClient.setQueryData(["currentUser"], data);
      router.replace("/(auth)/login");
    },
    onError: (error: Error) => {
      console.error("Sign up error: ", error);
    },
  });

  const signInMutation = useMutation({
    mutationFn: (params: SignInParams) => signIn(params),
    onSuccess: async () => {
      const userData = await queryClient.fetchQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
      });
      setUser(userData);
      router.replace("/(tabs)/home");
    },
    onError: (error: Error) => {
      console.error("Sign in error: ", error);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.replace("/(auth)/login");
    },
    onError: (error: Error) => {
      console.error("Sign out error: ", error);
    },
  });

  return {
    user,
    isLoadingUser,
    signUp: signUpMutation.mutate,
    signIn: signInMutation.mutate,
    signOut: signOutMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    signUpError: signUpMutation.error,
    signInError: signInMutation.error,
    signOutError: signOutMutation.error,
  };
}
