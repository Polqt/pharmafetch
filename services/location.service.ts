import * as Location from "expo-location";

export const locationService = {
  async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    return status === "granted";
  },

  async getCurrentLocation(): Promise<UserLocation | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error("Failed to get current location:", error);
      return null;
    }
  },
};
