import { AddStock, Leaf } from "@prisma/client";

export interface addStockSlice {
  item: AddStock[];
  isLoading: boolean;
  error: null | string;
}
