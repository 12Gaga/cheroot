import { Garage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface garageSlice {
  item: Garage[];
  selectedGarage: Garage | null;
  isLoading: boolean;
  error: null | string;
}

export interface createNewGarage extends BasicOption {
  name: string;
  workShopId: number | undefined;
}

export interface updateGarage extends BasicOption {
  id: number | null;
  name: string;
}
