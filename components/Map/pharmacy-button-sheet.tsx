import React from "react";
import { ScrollView, Text, View } from "react-native";
import { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import PharmacyCard from "./pharmacy-card";

export default function PharmacyButtonSheet({
  visible,
  pharmacies,
  selectedPharmacy,
  onClose,
}: PharmacyBottomSheetProps) {
  if (!visible) return null;

  return (
    <AnimatedView
      entering={FadeInDown.duration(300)}
      exiting={FadeOutDown.duration(300)}
      className="absoulute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
      style={{ maxHeight: "50%" }}
    >
      <View className="items-center py-3">
        <View className="w-12 h-1 bg-gray-300 rounded-full" />
      </View>

      <View className="px-4 pb-2">
        <Text className="text-lg font-semibold">Nearby pharmacies</Text>
      </View>

      <ScrollView className="px-4 pb-4">
        {pharmacies.map((pharmacy) => (
          <PharmacyCard
            key={pharmacy.$id}
            pharmacy={pharmacy}
            isSelected={selectedPharmacy?.$id === pharmacy.$id}
            onPress={onClose}
          />
        ))}
      </ScrollView>
    </AnimatedView>
  );
}
