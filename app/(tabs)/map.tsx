import PharmacyButtonSheet from "@/components/Map/pharmacy-button-sheet";
import PharmacyMarker from "@/components/Map/pharmacy-marker";
import { useLocation } from "@/hooks/useLocation";
import { useMapInteraction } from "@/hooks/useMapInteraction";
import { usePharmacies } from "@/hooks/usePharmacies";
import { sortByDistance } from "@/utils/distantCalculator";
import { fitMarkersToMap, NEGROS_OCCIDENTAL_CENTER } from "@/utils/mapHelper";
import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
  const mapRef = useRef<MapView>(null);

  const { data: pharmacies, isLoading, error } = usePharmacies();
  const { location, loading: locationLoading } = useLocation();
  const {
    selectedPharmacy,
    isBottomSheetVisible,
    handleMarkerPress,
    handleCloseBottomSheet,
  } = useMapInteraction();

  const sortedPharmacies =
    pharmacies && location
      ? sortByDistance(pharmacies, location)
      : pharmacies || [];

  useEffect(() => {
    if (pharmacies && pharmacies.length > 0 && mapRef.current) {
      const region = fitMarkersToMap(pharmacies);
      if (region) {
        setTimeout(() => {
          mapRef.current?.animateToRegion(region, 1000);
        });
      }
    }
  }, [pharmacies]);

  if (isLoading || locationLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-600">Loading pharmacies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-red-600 text-center">
          Failed to load pharmacies. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          className="flex-1"
          initialRegion={NEGROS_OCCIDENTAL_CENTER}
          showsUserLocation
          showsMyLocationButton
        >
          {sortedPharmacies.map((pharmacy) => (
            <PharmacyMarker
              key={pharmacy.$id}
              pharmacy={pharmacy}
              isSelected={selectedPharmacy?.$id === pharmacy.$id}
              onPress={handleMarkerPress}
            />
          ))}
        </MapView>

        <PharmacyButtonSheet
          visible={isBottomSheetVisible}
          pharmacies={sortedPharmacies.slice(0, 5)}
          selectedPharmacy={selectedPharmacy}
          onClose={handleCloseBottomSheet}
        />
      </View>
    </SafeAreaView>
  );
}
