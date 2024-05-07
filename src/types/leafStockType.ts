import { Leaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface leafStockSlice {
  item: Leaf[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLeafStock extends BasicOption {
  date: string;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shopId: number;
  garageId: number | undefined;
}

export interface createNewLeafAddStock extends BasicOption {
  date: string;
  invNo: number;
  carNo: string;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shopId: number;
  garageId: number | undefined;
}
