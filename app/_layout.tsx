import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import CustomSplashScreen from '../components/SplashScreen'; // Assuming you have a splash screen component
import '../global.css';
import { AuthProvider, useAuth } from './(contexts)/AuthContext';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated && !inAuthGroup) {
      // We are authenticated and not in any auth group, so we should be in the app.
      router.replace('/(tabs)/home');
    } else if (!isAuthenticated) {
      // We are not authenticated, so we should be in the auth flow.
      router.replace('/(auth)/login');
    }
    
    SplashScreen.hideAsync();

  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return <CustomSplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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