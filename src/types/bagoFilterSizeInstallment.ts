import { BagoFilterSizeInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoFilterSizeInstallmentSlice {
  item: BagoFilterSizeInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addBagoFilterSizeInstallment extends BasicOption {
  date: Date | null;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateBagoFilterSizeInstallment extends BasicOption {
  id: number | null;
  date: Date | null;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteBagoFilterSizeInstallment extends BasicOption {
  id: number;
}
