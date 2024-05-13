import { BagoLeafPurchase } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoLeafSlice {
  item: BagoLeafPurchase[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewBagoLeaf extends BasicOption {
  date: string;
  shopId: number | null;
  typeOfLeafId: number | null;
  netWeight: number;
  netPrice: number;
  totalPrice: number;
}

export interface updateBagoLeaf extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  typeOfLeafId: number | null;
  netWeight: number;
  netPrice: number;
  totalPrice: number;
}

export interface deleteBagoLeaf extends BasicOption {
  id: number;
}
