import { locationService } from "@/services/location.service";
import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      setLoading(true);

      const userLocation = await locationService.getCurrentLocation();
      setLocation(userLocation);
      setError(null);
    } catch (error) {
      console.error("Error fetching location:", error);
      setError("Failed to fetch location");
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    loading,
    error,
    refetch: fetchLocation,
  };
}
