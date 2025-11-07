interface Pharmacy {
  $id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  isOpen?: boolean;
  distance?: number;
  image?: string;
}

interface PharmacyMarkerProps {
  pharmacy: Pharmacy;
  isSelected: boolean;
  onPress: (pharmacy: Pharmacy) => void;
}

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}
