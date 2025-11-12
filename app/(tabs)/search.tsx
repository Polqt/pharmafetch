import SearchBar from "@/components/search";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between p-4">
        <SearchBar />
      </View>
    </SafeAreaView>
  );
}
