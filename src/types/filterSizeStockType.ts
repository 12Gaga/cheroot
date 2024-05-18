import { FilterSize, Leaf } from "@prisma/client";
import { BasicOption } from "./appType";
import { DateTime } from "next-auth/providers/kakao";

export interface filterSizeStockSlice {
  item: FilterSize[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewFilterSizeStock extends BasicOption {
  date: string;
  typeOfFilterSizeId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface updateFilterSizeStock extends BasicOption {
  id: number | null;
  date: string;
  typeOfFilterSizeId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteFilterSizeStock extends BasicOption {
  id: number;
}

export interface createNewFilterSizeAddStock extends BasicOption {
  date: string;
  invNo: number;
  carNo: string;
  typeOfFilterSizeId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface updateFilterSizeAddStock extends BasicOption {
  stockSeq: string;
  date: string;
  invNo: number;
  carNo: string;
  typeOfFilterSizeId: number | undefined;
  quantity: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteFilterSizeAddStock extends BasicOption {
  stockSeq: string;
}
