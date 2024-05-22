import { BagoLabelInstallment, BagoPlasticInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface bagoPlasticInstallmentSlice {
  item: BagoPlasticInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addBagoPlasticlInstallment extends BasicOption {
  date: string;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateBagoPlasticInstallment extends BasicOption {
  id: number | null;
  date: string;
  shopId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteBagoPlasticInstallment extends BasicOption {
  id: number;
}
