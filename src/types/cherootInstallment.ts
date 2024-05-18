import { ConverycherootInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface cherootInstallmentSlice {
  item: ConverycherootInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addCherootInstallment extends BasicOption {
  date: string;
  conveyLocationId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateCherootInstallment extends BasicOption {
  id: number | null;
  date: string;
  conveyLocationId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteCherootInstallment extends BasicOption {
  id: number;
}
