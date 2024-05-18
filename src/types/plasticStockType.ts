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

export interface updatePlasticStock extends BasicOption {
  id: number | null;
  date: string;
  typeOfPlasticId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deletePlasticStock extends BasicOption {
  id: number;
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

export interface updatePlasticAddStock extends BasicOption {
  stockSeq: string;
  date: string;
  invNo: number;
  carNo: string;
  typeOfPlasticId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deletePlasticAddStock extends BasicOption {
  stockSeq: string;
}
