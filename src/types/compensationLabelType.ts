import { CompensationLabel } from "@prisma/client";
import { BasicOption } from "./appType";

export interface compensationLabel {
  item: CompensationLabel[];
  isLoading: boolean;
  error: null | string;
}

export interface createCompensationLabel extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  typeOfLabelId: number | undefined;
  remainBandel: number;
  compensationBandle: number;
  takeMoneyBandle: number;
  labelPrice: number;
  tolAmount: number;
  addCashBig: number;
  addCashsmall: number;
  inCash: number;
}

export interface deleteCompensationLabel extends BasicOption {
  id: number;
}
