import { BagoLabelInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoLabelInstallmentSlice {
  item: BagoLabelInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addBagoLabelInstallment extends BasicOption {
  date: Date | null;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateBagoLabelInstallment extends BasicOption {
  id: number | null;
  date: Date | null;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteBagoLabelInstallment extends BasicOption {
  id: number;
}
