import { BasicOption } from "./appType";

export interface closing {
  dailyClosing: number;
  mainClosing: number;
}

export interface closingSlice {
  item: closing[];
  isLoading: boolean;
  error: null | string;
}

export interface addClosing extends BasicOption {
  date: string;
  cashBalance: number;
  replenishment: number;
  dailyBalance: number;
  dailyClosing: number;
  mainBalance: number;
  directPayment: number;
  mainClosing: number;
}
