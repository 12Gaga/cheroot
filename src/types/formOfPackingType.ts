import { FormOfPacking } from "@prisma/client";
import { BasicOption } from "./appType";

export interface formOfPackingSlice {
  item: FormOfPacking[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewFormOfPacking extends BasicOption {
  name: string;
  typeOfCherootId: number | undefined;
  typeOfPackingId: number | undefined;
  packingPlasticId: number | undefined;
  packingQty: number;
  warppingPlasticId: number | undefined;
  warppingQty: number;
  coverPlasticId: number | undefined;
  coverQty: number;
  amount: number;
  quantity: number;
}

export interface updateFormOfPacking extends BasicOption {
  id: number | null;
  name: string;
  typeOfCherootId: number | undefined;
  typeOfPackingId: number | undefined;
  packingPlasticId: number | undefined;
  packingQty: number;
  warppingPlasticId: number | undefined;
  warppingQty: number;
  coverPlasticId: number | undefined;
  coverQty: number;
  amount: number;
  quantity: number;
}

export interface deleteFormOfPacking extends BasicOption {
  id: number;
}
