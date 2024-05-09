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

export interface updateLeaf extends BasicOption {
  id: number | null;
  name: string;
  price: number;
}

export interface deleteLeaf extends BasicOption {
  id: number;
}
