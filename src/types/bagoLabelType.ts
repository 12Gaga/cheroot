import { BagoLabelPurchase, BagoLeafPurchase } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoLabelSlice {
  item: BagoLabelPurchase[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewBagoLabel extends BasicOption {
  date: string;
  shopId: number | null;
  typeOfLabelId: number | null;
  bandle: number;
  totalPrice: number;
}

export interface updateBagoLabel extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  typeOfLabelId: number | null;
  bandle: number;
  totalPrice: number;
}

export interface deleteBagoLabel extends BasicOption {
  id: number;
}
