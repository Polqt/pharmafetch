import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import { useState, useEffect } from 'react';

export default function WelcomeScreen() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
      
      <View className="flex-1 items-center justify-between p-6 pt-16 pb-8">
        <View />
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
          className="items-center"
        >
          <View className="bg-white rounded-3xl p-8 shadow-xl items-center mb-8">
            <Image
              className="w-20 h-20 mb-4"
              resizeMode="contain"
              source={require('../../assets/images/Logo.png')}
            />
            <Text className="text-4xl font-extrabold text-blue-600 tracking-tight">
              PharmaFetch
            </Text>
            <View className="w-16 h-1 bg-blue-600 rounded-full mt-2" />
          </View>

          <View className="items-center px-4">
            <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Your Pharmacy, Simplified
            </Text>
            <Text className="text-lg text-gray-600 text-center leading-relaxed">
              Access medications, track prescriptions, and manage your health with ease.
            </Text>
          </View>

          <View className="mt-8 space-y-3">
            {[
              '🏥 Find nearby pharmacies',
              '💊 Order medications online',
              '📋 Track prescriptions',
              '⏰ Medication reminders'
            ].map((feature, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateX: slideAnim }]
                }}
                className="bg-white/80 px-4 py-2 rounded-full"
              >
                <Text className="text-gray-700 text-center font-medium">
                  {feature}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Bottom buttons */}
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className="w-full space-y-4"
        >
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
            className="bg-blue-600 active:bg-blue-700 p-4 rounded-2xl w-full shadow-lg"
          >
            <Text className="text-white text-center text-lg font-bold">
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(auth)/signup')}
            className="bg-white/90 border-2 border-blue-600 active:bg-blue-50 p-4 rounded-2xl w-full"
          >
            <Text className="text-blue-600 text-center text-lg font-semibold">
              Create New Account
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}