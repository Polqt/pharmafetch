import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import React, { useEffect } from "react";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { QueryProvider } from "./providers/QueryProvider";
import * as Sentry from "@sentry/react-native";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/appwrite";
import { useAuthStore } from "@/store/authStore";

Sentry.init({
  dsn: "https://7d7a6ad2859681db0701bd01d93a62aa@o4508879441756160.ingest.us.sentry.io/4510317682688000",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [loaded, error] = useFonts({
    "Galyon-Bold": require("../assets/fonts/Galyon-Bold.otf"),
    "SF-UI-Display-Bold": require("../assets/fonts/SF-UI-Display-Bold.otf"),
    "SF-UI-Display-Light": require("../assets/fonts/SF-UI-Display-Light.otf"),
    "SF-UI-Display-Medium": require("../assets/fonts/SF-UI-Display-Medium.otf"),
  });

  const { setUser } = useAuthStore();

  const { isLoading: isCheckingAuth } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        return user
      } catch {
        return null;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (isCheckingAuth) {
    return null;
  } 

  return (
    <QueryProvider>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </QueryProvider>
  );
});
