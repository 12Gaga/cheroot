import { ReplenishmentMoney } from "@prisma/client";
import { BasicOption } from "./appType";

export interface replenishmentTypeSlice {
  item: ReplenishmentMoney[];
  isLoading: boolean;
  error: null | string;
}

export interface addReplenishment extends BasicOption {
  date: string;
  amount: number;
}

export interface updateReplenishment extends BasicOption {
  id: number | null;
  date: string;
  amount: number;
}

export interface deleteReplenishment extends BasicOption {
  id: number;
}
