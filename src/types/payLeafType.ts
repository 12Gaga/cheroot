import { Leaf, PayLeaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface payLeafSlice {
  item: PayLeaf[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewPayLeaf extends BasicOption {
  date: string;
  agentId: number | undefined;
  typeOfLeafId: number | undefined;
  batchNo: number[];
  viss: number;
  discountViss: number;
  netViss: number;
  price: number;
  amount: number;
  garageId: number | undefined;
}
