import { LabelTransferGarage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface labelTransferSlice {
  item: LabelTransferGarage[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLabelTransfer extends BasicOption {
  date: Date | null;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfLabelId: number | null;
  bandle: number;
}

export interface updateLabelTransfer extends BasicOption {
  id: number | null;
  date: Date | null;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfLabelId: number | null;
  bandle: number;
}

export interface deleteLabelTransfer extends BasicOption {
  id: number;
}
