import { BagoLeafPurchase } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoLeafSlice {
  item: BagoLeafPurchase[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewBagoLeaf extends BasicOption {
  date: Date | null;
  shopId: number | null;
  typeOfLeafId: number | null;
  netWeight: number;
  netPrice: number;
  totalPrice: number;
}

export interface updateBagoLeaf extends BasicOption {
  id: number | null;
  date: Date | null;
  shopId: number | null;
  typeOfLeafId: number | null;
  netWeight: number;
  netPrice: number;
  totalPrice: number;
}

export interface deleteBagoLeaf extends BasicOption {
  id: number;
}
