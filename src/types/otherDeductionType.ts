import { OtherDeduction } from "@prisma/client";
import { BasicOption } from "./appType";
import { createNewReturnCheroot } from "./returnCherootType";
import { createNewLeafDeduction } from "./leafDeductionType";

export interface otherDeductionSlice {
  item: OtherDeduction[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewOtherDeduction extends BasicOption {
  cheroots: createNewReturnCheroot[];
  leaf: createNewLeafDeduction[];
  date: Date | null;
  deductDate: Date | null;
  agentId: number | undefined;
  cashAdvanceBigDeduction: number;
  cashAdvanceSmallDeduction: number;
  otherDeduction: number;
  cashAdvanceBig: number;
  cashAdvanceSmall: number;
  netAgentPayment: number;
  bonusPayment: number;
  totalNetAgentPayment: number;
  purchaseSeq: string;
}
