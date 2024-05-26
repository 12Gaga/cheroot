import { LeafDeduction, ReturnReadyCheroot } from "@prisma/client";
import { BasicOption } from "./appType";

export interface leafDeductionSlice {
  item: LeafDeduction[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLeafDeduction extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  typeOfLeafId: number | undefined;
  deductViss: number;
  price: number;
  deductionAmount: number;
}
