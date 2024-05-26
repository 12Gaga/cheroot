import { DailyExpensive, Garage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface dailyExpensiveTypeSlice {
  item: DailyExpensive[];
  isLoading: boolean;
  error: null | string;
}

export interface addDailyExpensive extends BasicOption {
  date: Date | null;
  expensiveLabelId: number | null;
  content: string;
  amount: number;
}

export interface updateDailyExpensive extends BasicOption {
  id: number | null;
  date: Date | null;
  expensiveLabelId: number | null;
  content: string;
  amount: number;
}

export interface deleteDailyExpensive extends BasicOption {
  id: number;
}
