import { ExtraPurchase, Leaf, PayLeaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface extraPurchaseSlice {
  item: ExtraPurchase[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewExtraPurchase extends BasicOption {
  date: Date | null;
  agentId: number | undefined;
  typeOfFilterSizeId: number | undefined;
  filterSizeQty: number;
  filterSizeBag: number;
  filterSizePrice: number;
  filterSizeAmount: number;
  typeOfTabaccoId: number | undefined;
  tabaccoQty: number;
  tabaccoTin: number;
  tabaccoPyi: number;
  tabaccoBag: number;
  tabaccoPrice: number;
  tabaccoAmount: number;
  typeOfLabelId: number | undefined;
  labelBandle: number;
  labelPrice: number;
  labelAmount: number;
  totalAmount: number;
  garageId: number | undefined;
}
