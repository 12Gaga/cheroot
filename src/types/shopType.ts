import { TypeOfShop } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfShopSlice {
  item: TypeOfShop[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewShop extends BasicOption {
  name: string;
}

export interface updateShop extends BasicOption {
  id: number | null;
  name: string;
}

export interface deleteShop extends BasicOption {
  id: number;
}
