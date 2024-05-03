import { Leaf } from "@prisma/client";
import { BasicOption } from "./appType";
import { DateTime } from "next-auth/providers/kakao";

export interface leafStockSlice {
  item: Leaf[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLeafStock extends BasicOption {
  date: DateTime | undefined;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shop: string;
  garageId: number | undefined;
}

export interface createNewLeafAddStock extends BasicOption {
  invNo: number;
  carNo: string;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shop: string;
  garageId: number | undefined;
}
