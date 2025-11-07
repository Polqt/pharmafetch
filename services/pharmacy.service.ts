import { appConfig, databases } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

export const pharmacyService = {
  async getNegrosOccidentalPharmacies(): Promise<Pharmacy[]> {
    try {
      const response = await databases.listDocuments(
        appConfig.appwrite.databaseId!,
        "pharmacies",
        [Query.equal("province", "Negros Occidental")],
      );
      return response.documents as Pharmacy[];
    } catch (error) {
      console.error("Failed to fetch pharmacies:", error);
      throw error;
    }
  },

  async getNearbyPharmacies(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
  ): Promise<Pharmacy[]> {
    const pharmacies = await this.getNegrosOccidentalPharmacies();
    return pharmacies;
  },
};
