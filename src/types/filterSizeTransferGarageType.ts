import { FilterSizeTransferGarage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface filterSizeTransferSlice {
  item: FilterSizeTransferGarage[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewFilterSizeTransfer extends BasicOption {
  date: string;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfFilterSizeId: number | null;
  quantity: number;
  bag: number;
}

export interface updateFilterSizeTransfer extends BasicOption {
  id: number | null;
  date: string;
  exitGarageId: number | null;
  enterenceGarageId: number | null;
  typeOfFilterSizeId: number | null;
  quantity: number;
  bag: number;
}

export interface deleteFilterSizeTransfer extends BasicOption {
  id: number;
}
