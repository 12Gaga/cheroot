import { OtherDeduction } from "@prisma/client";
import { BasicOption } from "./appType";

export interface otherDeductionSlice {
  item: OtherDeduction[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewOtherDeduction extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  cashAdvanceBigDeduction: number;
  cashAdvanceSmallDeduction: number;
  otherDeduction: number;
  cashAdvanceBig: number;
  cashAdvanceSmall: number;
  netAgentPayment: number;
  bonusPayment: number;
  totalNetAgentPayment: number;
}
