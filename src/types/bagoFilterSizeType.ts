import { BagoFilterSizePurchase } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoFilterSizeSlice {
  item: BagoFilterSizePurchase[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewBagoFilterSize extends BasicOption {
  date: string;
  shopId: number | null;
  typeOfFilterSizeId: number | null;
  quantity: number;
  bag: number;
  totalPrice: number;
}

export interface updateBagoFilterSize extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  typeOfFilterSizeId: number | null;
  quantity: number;
  bag: number;
  totalPrice: number;
}

export interface deleteBagoFilterSize extends BasicOption {
  id: number;
}
