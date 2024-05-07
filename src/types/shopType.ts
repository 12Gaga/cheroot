import { TypeOfShop } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfShopSlice {
  item: TypeOfShop[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewShop extends BasicOption {
  name: string;
}
