import { TabaccoTransferGarage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface tabaccoTransferSlice {
  item: TabaccoTransferGarage[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewTabaccoTransfer extends BasicOption {
  date: Date | null;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfTabaccoId: number | null;
  tin: number;
  pyi: number;
  bag: number;
}

export interface updateTabaccoTransfer extends BasicOption {
  id: number | null;
  date: Date | null;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfTabaccoId: number | null;
  tin: number;
  pyi: number;
  bag: number;
}

export interface deleteTabaccoTransfer extends BasicOption {
  id: number;
}
