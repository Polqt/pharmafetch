import { pharmacyService } from "@/services/pharmacy.service";
import { useQuery } from "@tanstack/react-query";

export function usePharmacies() {
  return useQuery({
    queryKey: ["pharmacies", "negros-occidental"],
    queryFn: () => pharmacyService.getNegrosOccidentalPharmacies(),
    staleTime: 5 * 60 * 1000,
  });
}
