import { ExtraPurchaseSummery } from "@prisma/client";
import { BasicOption } from "./appType";

export interface extraPurchaseSummerySlice {
  item: ExtraPurchaseSummery[];
  isLoading: boolean;
  error: null | string;
}

export interface addBagoLeafInstallment extends BasicOption {
  date: Date | null;
  agentId: number | null;
  tolPrice: number;
}
