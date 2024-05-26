import { ConverycherootInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface cherootInstallmentSlice {
  item: ConverycherootInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addCherootInstallment extends BasicOption {
  date: Date | null;
  conveyLocationId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface updateCherootInstallment extends BasicOption {
  id: number | null;
  date: Date | null;
  conveyLocationId: number | null;
  cashBalance: number;
  payBalance: number;
}

export interface deleteCherootInstallment extends BasicOption {
  id: number;
}
