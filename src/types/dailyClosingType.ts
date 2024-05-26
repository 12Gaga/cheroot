import { ClosingDailyBalance } from "@prisma/client";
import { BasicOption } from "./appType";

export interface dailyClosingTypeSlice {
  item: ClosingDailyBalance[];
  isLoading: boolean;
  error: null | string;
}

export interface addDailyClosing extends BasicOption {
  date: Date | null;
  amount: number;
}

export interface updateDailyClosing extends BasicOption {
  id: number | null;
  date: Date | null;
  amount: number;
}

export interface deleteDailyClosing extends BasicOption {
  id: number;
}
