import { Label } from "@prisma/client";
import { BasicOption } from "./appType";

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

export interface updateLabelStock extends BasicOption {
  id: number | null;
  date: string;
  typeOfLabelId: number | undefined;
  bandle: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteLabelStock extends BasicOption {
  id: number;
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

export interface updateLabelAddStock extends BasicOption {
  stockSeq: string;
  date: string;
  invNo: number;
  carNo: string;
  typeOfLabelId: number | undefined;
  bandle: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteLabelAddStock extends BasicOption {
  stockSeq: string;
}
