import { AddStock, Leaf } from "@prisma/client";
import { BasicOption } from "./appType";
import { DateTime } from "next-auth/providers/kakao";

export interface addStockSlice {
  item: AddStock[];
  isLoading: boolean;
  error: null | string;
}
