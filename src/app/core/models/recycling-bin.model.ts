export interface RecyclingBin {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  wasteTypes: string;
  capacityKg: number;
  currentFillPercentage: number;
}