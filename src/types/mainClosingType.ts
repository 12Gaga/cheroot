import { ClosingMainBalance } from "@prisma/client";
import { BasicOption } from "./appType";

export interface mainClosingTypeSlice {
  item: ClosingMainBalance[];
  isLoading: boolean;
  error: null | string;
}

export interface addMainClosing extends BasicOption {
  date: string;
  amount: number;
}

export interface updateMainClosing extends BasicOption {
  id: number | null;
  date: string;
  amount: number;
}

export interface deleteMainClosing extends BasicOption {
  id: number;
}
