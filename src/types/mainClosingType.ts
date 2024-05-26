import { ClosingMainBalance } from "@prisma/client";
import { BasicOption } from "./appType";

export interface mainClosingTypeSlice {
  item: ClosingMainBalance[];
  isLoading: boolean;
  error: null | string;
}

export interface addMainClosing extends BasicOption {
  date: Date | null;
  amount: number;
}

export interface updateMainClosing extends BasicOption {
  id: number | null;
  date: Date | null;
  amount: number;
}

export interface deleteMainClosing extends BasicOption {
  id: number;
}
