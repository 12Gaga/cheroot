import { TypeOfCheroot } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfCherootSlice {
  item: TypeOfCheroot[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewCheroot extends BasicOption {
  name: string;
  price: number;
}

export interface updateCheroot extends BasicOption {
  id: number | null;
  name: string;
  price: number;
}

export interface deleteCheroot extends BasicOption {
  id: number;
}

export interface checkCherootItem {
  typeOfCheroot: number | null;
  location: number | null;
}
