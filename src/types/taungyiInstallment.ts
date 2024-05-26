import { TaungyiInstallment } from "@prisma/client";
import { BasicOption } from "./appType";

export interface taungyiInstallmentSlice {
  item: TaungyiInstallment[];
  isLoading: boolean;
  error: null | string;
}

export interface addTaungyiInstallment extends BasicOption {
  date: Date | null;
  banquetId: number | null;
  cashBalance: number;
  payBalance: number;
  cigratteIndustryId: number | null;
}

export interface updateTaungyiInstallment extends BasicOption {
  id: number | null;
  date: Date | null;
  banquetId: number | null;
  cashBalance: number;
  payBalance: number;
  cigratteIndustryId: number | null;
}

export interface deleteTaungyiInstallment extends BasicOption {
  id: number;
}
