import { MainMoney } from "@prisma/client";
import { BasicOption } from "./appType";

export interface mainMoneyTypeSlice {
  item: MainMoney[];
  isLoading: boolean;
  error: null | string;
}

export interface addMainMoney extends BasicOption {
  date: string;
  locationId: number | null;
  amount: number;
}

export interface updateMainMoney extends BasicOption {
  id: number | null;
  date: string;
  locationId: number | null;
  amount: number;
}

export interface deleteMainMoney extends BasicOption {
  id: number;
}
