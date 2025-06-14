import { AuthProvider } from '@/contexts/AuthContext'
import { Stack } from 'expo-router'
import React from 'react'
import '../global.css'

export default function _layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='(tabs)' />
      </Stack>
    </AuthProvider>
  )
}
