import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

export default function PharmacyMarker({
  pharmacy,
  isSelected,
  onPress,
}: PharmacyMarkerProps) {
  return (
    <Marker
      coordinate={{
        latitude: pharmacy.latitude,
        longitude: pharmacy.longitude,
      }}
      onPress={() => onPress(pharmacy)}
      tracksViewChanges={false}
    >
      <Image
        source={
          isSelected
            ? require("@/assets/images/marker-green.png")
            : require("@/assets/images/marker-green.png")
        }
        resizeMode="contain"
        style={{ width: 40, height: 50 }}
      />
    </Marker>
  );
}
