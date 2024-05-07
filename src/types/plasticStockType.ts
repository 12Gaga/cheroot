import { Plastic } from "@prisma/client";
import { BasicOption } from "./appType";

export interface plasticStockSlice {
  item: Plastic[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewPlasticStock extends BasicOption {
  date: string;
  typeOfPlasticId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface createNewPlasticAddStock extends BasicOption {
  date: string;
  invNo: number;
  carNo: string;
  typeOfPlasticId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}
