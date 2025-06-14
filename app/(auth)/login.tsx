import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .catch(error => Alert.alert('Google Sign-In Error', error.message));
    }
  }, [response]);

  const handleEmailLogin = () => {
    if (!email || !password) {
        Alert.alert('Error', 'Please enter both email and password.');
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => Alert.alert('Login Error', error.message));
  };

  return (
    <View className="flex-1 justify-center bg-gray-50 p-6">
      <Text className="text-4xl font-extrabold mb-2 text-center text-gray-800">Welcome Back</Text>
      <Text className="text-lg text-gray-500 mb-8 text-center">Log in to your account</Text>
      
      <TextInput className="bg-white p-4 rounded-lg mb-4 border border-gray-200" placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput className="bg-white p-4 rounded-lg mb-6 border border-gray-200" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      
      <TouchableOpacity onPress={handleEmailLogin} className="bg-blue-600 p-4 rounded-lg shadow">
        <Text className="text-white text-center font-bold text-base">Login</Text>
      </TouchableOpacity>

      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <TouchableOpacity onPress={() => promptAsync()} disabled={!request} className="bg-white border border-gray-300 p-4 rounded-lg flex-row items-center justify-center mb-4 shadow-sm">
        <FontAwesome name="google" size={20} color="#DB4437" style={{ marginRight: 12 }} />
        <Text className="text-gray-700 font-semibold">Continue with Google</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Don&apos;t have an account? </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity>
             <Text className="text-blue-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}