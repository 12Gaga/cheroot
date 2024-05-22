import { BagoLeafInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoLeafInstallmentSlice {
  item: BagoLeafInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addBagoLeafInstallment extends BasicOption {
  date: string;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateBagoLeafInstallment extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteBagoLeafInstallment extends BasicOption {
  id: number;
}
