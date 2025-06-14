import { useAuth } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function AuthLayout() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  if (!isInitialized || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}