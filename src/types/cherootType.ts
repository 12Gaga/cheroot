import { TypeOfCheroot } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfCherootSlice {
  item: TypeOfCheroot[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewCheroot extends BasicOption {
  name: string;
  price: number;
}
