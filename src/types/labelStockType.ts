import { Label } from "@prisma/client";
import { BasicOption } from "./appType";
import { DateTime } from "next-auth/providers/kakao";

export interface labelStockSlice {
  item: Label[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLabelStock extends BasicOption {
  date: string;
  typeOfLabelId: number | undefined;
  bandle: number;
  shopId: number;
  garageId: number | undefined;
}

export interface createNewLabelAddStock extends BasicOption {
  date: string;
  invNo: number;
  carNo: string;
  typeOfLabelId: number | undefined;
  bandle: number;
  shopId: number;
  garageId: number | undefined;
}
