import { useCallback, useState } from "react";

export function useMapInteraction() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleMarkerPress = useCallback((pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
    setTimeout(() => setSelectedPharmacy(null), 300);
  }, []);

  return {
    selectedPharmacy,
    isBottomSheetVisible,
    handleMarkerPress,
    handleCloseBottomSheet,
  };
}
