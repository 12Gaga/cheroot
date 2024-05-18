import { BagoInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoInstallmentSlice {
  item: BagoInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addBagoInstallment extends BasicOption {
  date: string;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateBagoInstallment extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteBagoInstallment extends BasicOption {
  id: number;
}
