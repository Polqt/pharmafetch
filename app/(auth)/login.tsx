import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/welcome');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (response?.type === 'success') {
      handleGoogleSignIn(response.params.id_token);
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken: string) => {
    try {
      setIsGoogleLoading(true);
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      // Navigation will be handled by AuthContext
    } catch (error: any) {
      Alert.alert('Google Sign-In Error', error.message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Navigation will be handled by AuthContext
    } catch (error: any) {
      let errorMessage = 'An error occurred during login.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Login Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <StatusBar style="dark" />
      <View className="flex-1 justify-center bg-gray-50 p-6">
        <View className="mb-8">
          <Text className="text-4xl font-extrabold mb-2 text-center text-gray-800">
            Welcome Back
          </Text>
          <Text className="text-lg text-gray-500 text-center">
            Log in to your PharmaFetch account
          </Text>
        </View>
        
        <View className="space-y-4">
          <TextInput 
            className="bg-white p-4 rounded-lg border border-gray-200 text-gray-800"
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address"
            editable={!isLoading}
            autoComplete="email"
          />
          
          <TextInput 
            className="bg-white p-4 rounded-lg border border-gray-200 text-gray-800"
            placeholder="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
            editable={!isLoading}
            autoComplete="password"
          />
          
          <TouchableOpacity 
            onPress={handleEmailLogin} 
            disabled={isLoading || isGoogleLoading}
            className={`p-4 rounded-lg shadow ${
              isLoading || isGoogleLoading ? 'bg-gray-400' : 'bg-blue-600 active:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold text-base">
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity 
          onPress={() => promptAsync()} 
          disabled={!request || isLoading || isGoogleLoading}
          className={`border border-gray-300 p-4 rounded-lg flex-row items-center justify-center shadow-sm ${
            !request || isLoading || isGoogleLoading ? 'bg-gray-100' : 'bg-white active:bg-gray-50'
          }`}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color="#DB4437" />
          ) : (
            <>
              <FontAwesome name="google" size={20} color="#DB4437" style={{ marginRight: 12 }} />
              <Text className="text-gray-700 font-semibold">Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity disabled={isLoading || isGoogleLoading}>
               <Text className={`font-bold ${
                 isLoading || isGoogleLoading ? 'text-gray-400' : 'text-blue-600'
               }`}>
                 Sign Up
               </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}