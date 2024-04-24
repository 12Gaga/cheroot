import { Tabacco } from "@prisma/client";
import { BasicOption } from "./appType";
import { DateTime } from "next-auth/providers/kakao";

export interface tabaccoStockSlice {
  item: Tabacco[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewTabaccoStock extends BasicOption {
  typeOfTabaccoId: number | undefined;
  tin: number;
  pyi: number;
  bag: number;
  shop: string;
  garageId: number | undefined;
}

export interface createNewTabaccoAddStock extends BasicOption {
  invNo: number;
  carNo: string;
  typeOfTabaccoId: number | undefined;
  tin: number;
  pyi: number;
  bag: number;
  shop: string;
  garageId: number | undefined;
}
