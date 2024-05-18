import { TaungyiQuitStock, TypeOfLeaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface taungyiExitStockSlice {
  item: TaungyiQuitStock[];
  isLoading: boolean;
  error: null | string;
}

export interface addNewTaungyiExitStock extends BasicOption {
  date: string;
  storeId: number | null;
  tolBatchNo: number;
  netWeight: number;
  cigratteIndustryId: number | null;
}

export interface updateTaungyiExitStock extends BasicOption {
  id: number | null;
  date: string;
  storeId: number | null;
  tolBatchNo: number;
  netWeight: number;
  cigratteIndustryId: number | null;
}

export interface deleteTaungyiExitStock extends BasicOption {
  id: number;
}
