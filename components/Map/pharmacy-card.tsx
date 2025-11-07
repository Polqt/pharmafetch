import { cn } from "@/lib/utils";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function PharmacyCard({
  pharmacy,
  isSelected,
  onPress,
}: PharmacyCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row bg-white rounded-xl p-3 mb-3 border",
        isSelected ? "border-primary" : "border-gray-200",
      )}
    >
      <Image
        source={{ uri: pharmacy.image }}
        className="w-20 h-20 rounded-lg"
      />

      <View className="flex-1 ml-3 justify-between">
        <View>
          <Text className="font-semibold text-base">{pharmacy.name}</Text>
          <Text className="text-sm text-gray-600 mt-0.5">
            {pharmacy.openingHours}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">{pharmacy.address}</Text>
        </View>
        {pharmacy.distance && (
          <Text className="text-xs text-gray-400">
            {pharmacy.distance} km away
          </Text>
        )}
      </View>

      <View className="items-end justify-between">
        <View
          className={cn(
            "px-3 py-1 rounded-full",
            pharmacy.isOpen ? "bg-green-100" : "bg-red-100",
          )}
        >
          <Text
            className={cn(
              "text-xs font-semibold",
              pharmacy.isOpen ? "text-green-600" : "text-red-600",
            )}
          >
            {pharmacy.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
