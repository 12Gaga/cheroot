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

export interface updateTabaccoStock extends BasicOption {
  id: number | null;
  date: string;
  typeOfTabaccoId: number | undefined;
  tin: number;
  pyi: number;
  bag: number;
  shopId: number;
  garageId: number | undefined;
}

export interface deleteTabaccoStock extends BasicOption {
  id: number | null;
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

export interface updateTabaccoAddStock extends BasicOption {
  stockSeq: string;
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

export interface deleteTabaccoAddStock extends BasicOption {
  stockSeq: string;
}
