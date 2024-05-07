import { Tabacco } from "@prisma/client";
import { BasicOption } from "./appType";
import { DateTime } from "next-auth/providers/kakao";

export interface tabaccoStockSlice {
  item: Tabacco[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewTabaccoStock extends BasicOption {
  date: string;
  typeOfTabaccoId: number | undefined;
  tin: number;
  pyi: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface createNewTabaccoAddStock extends BasicOption {
  date: string;
  invNo: number;
  carNo: string;
  typeOfTabaccoId: number | undefined;
  tin: number;
  pyi: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}
