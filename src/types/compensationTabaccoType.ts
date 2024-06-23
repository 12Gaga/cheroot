import { CompensationTabacco } from "@prisma/client";
import { BasicOption } from "./appType";

export interface compensationTabacco {
  item: CompensationTabacco[];
  isLoading: boolean;
  error: null | string;
}

export interface createCompensationTabacco extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  typeOfTabaccoId: number | undefined;
  remainPyi: number;
  compensationPyi: number;
  takeMoneyPyi: number;
  tabaccoPrice: number;
  tolAmount: number;
  addCashBig: number;
  addCashsmall: number;
  inCash: number;
}

export interface deleteCompensationTabacco extends BasicOption {
  id: number;
}
