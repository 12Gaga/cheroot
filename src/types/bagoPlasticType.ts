import { BagoLeafPurchase, BagoPlasticPurchase } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoPlasticSlice {
  item: BagoPlasticPurchase[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewBagoPlastic extends BasicOption {
  date: string;
  shopId: number | null;
  plasticId: number | null;
  quantity: number;
  bag: number;
  totalPrice: number;
}

export interface updateBagoPlastic extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  plasticId: number | null;
  quantity: number;
  bag: number;
  totalPrice: number;
}

export interface deleteBagoPlastic extends BasicOption {
  id: number;
}
