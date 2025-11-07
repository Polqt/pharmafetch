export const NEGROS_OCCIDENTAL_CENTER = {
  latitude: 10.6593,
  longitude: 122.9724,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
};

export function isPharmacyOpen(openingHours: string): boolean {
  return true;
}

export function fitMarkersToMap(pharmacies: Pharmacy[]): MapRegion | null {
  if (pharmacies.length === 0) return null;

  let minLat = pharmacies[0].latitude;
  let maxLat = pharmacies[0].latitude;
  let minLon = pharmacies[0].longitude;
  let maxLon = pharmacies[0].longitude;

  pharmacies.forEach((pharmacy) => {
    minLat = Math.min(minLat, pharmacy.latitude);
    maxLat = Math.max(maxLat, pharmacy.latitude);
    minLon = Math.min(minLon, pharmacy.longitude);
    maxLon = Math.max(maxLon, pharmacy.longitude);
  });

  const latitude = (minLat + maxLat) / 2;
  const longitude = (minLon + maxLon) / 2;
  const latitudeDelta = (maxLat - minLat) * 1.2;
  const longitudeDelta = (maxLon - minLon) * 1.2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
}
