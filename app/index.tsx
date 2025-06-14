import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, View, Text, Animated } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const { isInitialized, isAuthenticated, logout } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(async () => {
        if (isAuthenticated) {
          await logout();
        }
        router.replace('/(auth)/welcome');
      }, 2500); 

      return () => clearTimeout(timer);
    }
  }, [isInitialized, isAuthenticated, router, logout]);

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <StatusBar style="dark" />
      
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
        className="items-center"
      >
        <View className="bg-white rounded-3xl p-8 shadow-lg items-center mb-8">
          <Image
            className="w-24 h-24 mb-4"
            resizeMode="contain"
            source={require('../assets/images/Logo.png')}
          />
          <Text className="text-3xl font-extrabold text-blue-600 tracking-tight">
            PharmaFetch
          </Text>
          <Text className="text-sm text-gray-500 mt-2 text-center">
            Your reliable pharmacy companion
          </Text>
        </View>
        
        <View className="flex-row space-x-1">
          <View className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          <View className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <View className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </View>
      </Animated.View>
    </View>
  );
}