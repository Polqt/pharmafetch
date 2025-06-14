import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleEmailSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.')
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        })
      }
      router.replace('/(auth)/login')
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    }
  }
  
  return (
    <View className="flex-1 justify-center bg-gray-50 p-6">
      <Text className="text-4xl font-extrabold mb-2 text-center text-gray-800">Create Account</Text>
      <Text className="text-lg text-gray-500 mb-8 text-center">Join PharmaFetch today!</Text>
      
      <TextInput className="bg-white p-4 rounded-lg mb-4 border border-gray-200" placeholder="Name" value={name} onChangeText={setName} autoCapitalize="words" />
      <TextInput className="bg-white p-4 rounded-lg mb-4 border border-gray-200" placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput className="bg-white p-4 rounded-lg mb-4 border border-gray-200" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput className="bg-white p-4 rounded-lg mb-6 border border-gray-200" placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <TouchableOpacity onPress={handleEmailSignup} className="bg-blue-600 p-4 rounded-lg shadow">
        <Text className="text-white text-center font-bold text-base">Sign Up</Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
             <Text className="text-blue-600 font-bold">Log In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
