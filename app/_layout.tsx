import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import '../global.css';
import { AuthProvider, useAuth } from './(contexts)/AuthContext';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { user, isLoading } = useAuth();
  const segements = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segements[0] === '(auth)';
    const inAppGroup = segements[0] === '(tabs)';

    if (user && !inAppGroup) {
      router.replace('/(tabs)/home');
    } else if (!user && !inAuthGroup) {
      
    }

    SplashScreen.hideAsync();
  }, [user, isLoading, segements, router]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
