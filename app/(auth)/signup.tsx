import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/welcome');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter a password.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleEmailSignup = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email.trim(), 
        password
      );

      // Update user profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name.trim()
        });
      }

      Alert.alert(
        'Success', 
        'Account created successfully! You can now log in.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login')
          }
        ]
      );
    } catch (error: any) {
      let errorMessage = 'An error occurred during signup.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already registered. Please try logging in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Signup Error', errorMessage);
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
            Create Account
          </Text>
          <Text className="text-lg text-gray-500 text-center">
            Join PharmaFetch today!
          </Text>
        </View>
        
        <View className="space-y-4">
          <TextInput 
            className="bg-white p-4 rounded-lg border border-gray-200 text-gray-800"
            placeholder="Full Name" 
            value={name} 
            onChangeText={setName} 
            autoCapitalize="words"
            editable={!isLoading}
            autoComplete="name"
          />
          
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
            placeholder="Password (min. 6 characters)" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
            editable={!isLoading}
            autoComplete="password-new"
          />
          
          <TextInput 
            className="bg-white p-4 rounded-lg border border-gray-200 text-gray-800"
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry
            editable={!isLoading}
            autoComplete="password-new"
          />

          <TouchableOpacity 
            onPress={handleEmailSignup} 
            disabled={isLoading}
            className={`p-4 rounded-lg shadow ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 active:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold text-base">
                Create Account
              </Text>
            )}
          </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity disabled={isLoading}>
               <Text className={`font-bold ${
                 isLoading ? 'text-gray-400' : 'text-blue-600'
               }`}>
                 Log In
               </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}