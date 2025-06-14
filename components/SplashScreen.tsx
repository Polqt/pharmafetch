
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export default function CustomSplashScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
        <Text className='text-4xl font-extrabold text-blue-600 mb-4 tracking-tight'>PharmaFetch</Text>
        <ActivityIndicator size={'large'} color={'#2563eb'} />
    </View>
  )
}
