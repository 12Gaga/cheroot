import { CompensationFilterSize } from "@prisma/client";
import { BasicOption } from "./appType";

export interface compensationFilterSize {
  item: CompensationFilterSize[];
  isLoading: boolean;
  error: null | string;
}

export interface createCompensationFilterSize extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  typeOfFilterId: number | undefined;
  remainQty: number;
  compensationQty: number;
  takeMoneyQty: number;
  filterPrice: number;
  tolAmount: number;
  addCashBig: number;
  addCashsmall: number;
  inCash: number;
}

export interface deleteCompensationFilterSize extends BasicOption {
  id: number;
}
