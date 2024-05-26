import { Leaf } from "@prisma/client";
import { BasicOption } from "./appType";
import typeOfShop from "@/store/slices/typeOfShop";

export interface leafStockSlice {
  item: Leaf[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLeafStock extends BasicOption {
  date: Date | null;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shopId: number;
  garageId: number | undefined;
}

export interface updateLeafStock extends BasicOption {
  id: number | null;
  date: Date | null;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteLeafStock extends BasicOption {
  id: number;
}

export interface createNewLeafAddStock extends BasicOption {
  date: Date | null;
  invNo: number;
  carNo: string;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shopId: number;
  garageId: number | undefined;
}

export interface updateLeafAddStock extends BasicOption {
  stockSeq: string;
  date: Date | null;
  invNo: number;
  carNo: string;
  typeOfLeafId: number | undefined;
  batchNo: number;
  viss: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteLeafAddStock extends BasicOption {
  stockSeq: string;
}

export interface checkOnItem {
  typeOfLeaf: number | null;
  typeOfShop: number | null;
}
