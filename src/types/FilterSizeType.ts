import { TypeOfFilterSize } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfFilterSizeSlice {
  item: TypeOfFilterSize[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewFilterSize extends BasicOption {
  name: string;
  price: number;
}

export interface updateFilterSize extends BasicOption {
  id: number | null;
  name: string;
  price: number;
}
