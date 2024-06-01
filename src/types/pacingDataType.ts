import { Conveying, Packing } from "@prisma/client";
import { BasicOption } from "./appType";

export interface packingDataSlice {
  item: Packing[];
  isLoading: boolean;
  error: null | string;
}

export interface addPackingData extends BasicOption {
  date: Date | null;
  typeOfCherootId: number | null;
  typeOfPackingId: number | null;
  formOfPackingId: number | null;
  quantity: number;
  garageId: number | null;
  packingPlasticId: number | null;
  packingPlasticQty: number;
  warpingPlasticId: number | null;
  warpingPlasticQty: number;
  coverPlasticId: number | null;
  coverPlasticQty: number;
}

export interface updatePackingData extends BasicOption {
  id: number | null;
  date: Date | null;
  typeOfCherootId: number | null;
  typeOfPackingId: number | null;
  formOfPackingId: number | null;
  quantity: number;
  garageId: number | null;
  packingPlasticId: number | null;
  packingPlasticQty: number;
  warpingPlasticId: number | null;
  warpingPlasticQty: number;
  coverPlasticId: number | null;
  coverPlasticQty: number;
}

export interface deletePackingData extends BasicOption {
  id: number;
}

export interface checkPackingOnItem {
  typeOfCheroot: number | null;
  typeOfPacking: number | null;
  formOfPacking: number | null;
}
