import { PayOtherItem } from "@prisma/client";
import { BasicOption } from "./appType";

export interface payStockSlice {
  item: PayOtherItem[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewPayStock extends BasicOption {
  date: string;
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  cherootQty: number;
  typeOfFilterSizeId: number | undefined;
  filterSizeQty: number;
  filterSizeBag: number;
  typeOfTabaccoId: number | undefined;
  tabaccoQty: number;
  tabaccoTin: number;
  tabaccoPyi: number;
  typeOfLabelId: number | undefined;
  labelBandle: number;
  totalPrice: number;
  garageId: number | undefined;
}

export interface payStock {
  cherootQty: number;
  filterSizeQty: number;
  filterSizeBag: number;
  tabaccoQty: number;
  tabaccoTin: number;
  tabaccoPyi: number;
}
