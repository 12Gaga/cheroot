import { MainDirectPayment, MainMoney } from "@prisma/client";
import { BasicOption } from "./appType";

export interface directPaymentTypeSlice {
  item: MainDirectPayment[];
  isLoading: boolean;
  error: null | string;
}

export interface addDirectPayment extends BasicOption {
  date: Date | null;
  tilte: string;
  amount: number;
}

export interface updateDirectPayment extends BasicOption {
  id: number | null;
  date: Date | null;
  tilte: string;
  amount: number;
}

export interface deleteDirectPayment extends BasicOption {
  id: number;
}
