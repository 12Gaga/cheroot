import { TypeOfTabacco } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfTabaccoSlice {
  item: TypeOfTabacco[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewTabacco extends BasicOption {
  name: string;
  price: number;
}

export interface updateTabacco extends BasicOption {
  id: number | null;
  name: string;
  price: number;
}

export interface deleteTabacco extends BasicOption {
  id: number;
}
