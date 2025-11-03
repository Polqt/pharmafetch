import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import React, { useEffect } from "react";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";

export default function RootLayout() {
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
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </>
  );
}
