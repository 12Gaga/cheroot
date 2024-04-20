import { TypeOfLeaf } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfLeafSlice {
  item: TypeOfLeaf[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewLeaf extends BasicOption {
  name: string;
  price: number;
}
