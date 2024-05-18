import { LeafTransferGarage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface leafTransferSlice {
  item: LeafTransferGarage[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLeafTransfer extends BasicOption {
  date: string;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfLeafId: number | null;
  batchNos: number[];
  tolViss: number;
}

export interface updateLeafTransfer extends BasicOption {
  transferSeq: string;
  date: string;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfLeafId: number | null;
  batchNos: number[];
  tolViss: number;
}

export interface deleteLeafTransfer extends BasicOption {
  transferSeq: string;
}
