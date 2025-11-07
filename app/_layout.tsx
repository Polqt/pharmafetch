import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import React, { useEffect } from "react";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import { QueryProvider } from "./providers/QueryProvider";
import * as Sentry from "@sentry/react-native";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/appwrite";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaProvider } from "react-native-safe-area-context";

Sentry.init({
  dsn: "https://7d7a6ad2859681db0701bd01d93a62aa@o4508879441756160.ingest.us.sentry.io/4510317682688000",
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],
});

function AppContent() {
  const { setUser } = useAuthStore();

  const { isLoading: isCheckingAuth } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        return user;
      } catch {
        setUser(null);
        return null;
      }
    },
    retry: false,
    staleTime: Infinity,
  });

  if (isCheckingAuth) {
    return null;
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle={"default"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <PortalHost />
    </View>
  );
}

function RootLayout() {
  const [loaded, error] = useFonts({
    "Galyon-Bold": require("../assets/fonts/Galyon-Bold.otf"),
    "SF-UI-Display-Bold": require("../assets/fonts/SF-UI-Display-Bold.otf"),
    "SF-UI-Display-Light": require("../assets/fonts/SF-UI-Display-Light.otf"),
    "SF-UI-Display-Medium": require("../assets/fonts/SF-UI-Display-Medium.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AppContent />
      </QueryProvider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(RootLayout);
