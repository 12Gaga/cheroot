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
  batchNos: [];
  tolViss: number;
}

export interface updateLeafTransfer extends BasicOption {
  id: number | null;
  date: string;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfLeafId: number | null;
  batchNos: [];
  tolViss: number;
}

export interface deleteLeafTransfer extends BasicOption {
  id: number;
}
