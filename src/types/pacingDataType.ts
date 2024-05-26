import { Conveying, Packing } from "@prisma/client";
import { BasicOption } from "./appType";

export interface packingDataSlice {
  item: Packing[];
  isLoading: boolean;
  error: null | string;
}

export interface addPackingData extends BasicOption {
  date: string;
  typeOfCherootId: number | null;
  typeOfPackingId: number | null;
  formOfPackingId: number | null;
  quantity: number;
  packingPlasticId: number | null;
  packingPlasticQty: number;
  warpingPlasticId: number | null;
  warpingPlasticQty: number;
  coverPlasticId: number | null;
  coverPlasticQty: number;
}

export interface updatePackingData extends BasicOption {
  id: number | null;
  date: string;
  typeOfCherootId: number | null;
  typeOfPackingId: number | null;
  formOfPackingId: number | null;
  quantity: number;
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
