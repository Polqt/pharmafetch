import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Catalog() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between p-4">
        <Text>Medicine Catalog</Text>
      </View>
    </SafeAreaView>
  );
}
