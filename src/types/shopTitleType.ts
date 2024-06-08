import { ShopTitle } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfShopTitleSlice {
  item: ShopTitle[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewShopTitle extends BasicOption {
  name: string;
}

export interface updateShopTitle extends BasicOption {
  id: number | null;
  name: string;
}

export interface deleteShopTitle extends BasicOption {
  id: number;
}
