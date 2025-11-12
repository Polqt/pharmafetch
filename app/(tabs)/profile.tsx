import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  return (
    <SafeAreaView className='flex-1'>
        <View className='flex-1 justify-center'>
            <Text>Profile</Text>
        </View>
    </SafeAreaView>
  )
}
