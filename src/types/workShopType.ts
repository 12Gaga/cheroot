import { WorkShop } from "@prisma/client";
import { BasicOption } from "./appType";

export interface workShopSlice {
  item: WorkShop[];
  selectedWorkShop: WorkShop | null;
  isLoading: boolean;
  error: null | string;
}

export interface createNewWorkShop extends BasicOption {
  name: string;
  industryId: number | null;
}

export interface updateWorkShop extends BasicOption {
  id: number | null;
  name: string;
}

export interface deleteWorkshop extends BasicOption {
  id: number;
}
