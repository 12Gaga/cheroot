import { CompensationLeaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface compensationLeaf {
  item: CompensationLeaf[];
  isLoading: boolean;
  error: null | string;
}

export interface createCompensationLeaf extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  typeOfLeafId: number | undefined;
  remainViss: number;
  compensationViss: number;
  takeMoneyViss: number;
  leafPrice: number;
  tolAmount: number;
  addCashBig: number;
  addCashsmall: number;
  inCash: number;
}

export interface deleteCompensationLeaf extends BasicOption {
  id: number;
}
