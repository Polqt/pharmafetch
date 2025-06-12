import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-between bg-white p-6">
      <StatusBar style="dark" />
      
      <View />

      <View className="items-center">

        <Text className="text-5xl font-extrabold text-blue-600 mb-2 tracking-tight">
          PharmaFetch
        </Text>
        <Text className="text-lg text-gray-500 text-center">
          Your reliable pharmacy, right at your fingertips.
        </Text>
      </View>
      <View className="w-full pb-4 space-y-4">
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity className="bg-blue-600 active:bg-blue-700 p-4 rounded-full w-full">
            <Text className="text-white text-center text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity className="bg-white border border-blue-600 active:bg-gray-100 p-4 rounded-full w-full">
            <Text className="text-blue-600 text-center text-lg font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}