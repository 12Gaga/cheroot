import { TaungyiEnterStock, TypeOfLeaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface taungyiEnterStockSlice {
  item: TaungyiEnterStock[];
  isLoading: boolean;
  error: null | string;
}

export interface addNewTaungyiEnterStock extends BasicOption {
  date: Date | null;
  storeId: number | null;
  banquetId: number | null;
  tolBatchNo: number;
  netWeight: number;
  netPrice: number;
  tolNetPrice: number;
  packingFees: number;
  tolPackingFees: number;
  totalPrice: number;
  cigratteIndustryId: number | null;
}

export interface updateTaungyiEnterStock extends BasicOption {
  id: number | null;
  date: Date | null;
  storeId: number | null;
  banquetId: number | null;
  tolBatchNo: number;
  netWeight: number;
  netPrice: number;
  tolNetPrice: number;
  packingFees: number;
  tolPackingFees: number;
  totalPrice: number;
  cigratteIndustryId: number | null;
}

export interface deleteTaungyiEnterStock extends BasicOption {
  id: number;
}
