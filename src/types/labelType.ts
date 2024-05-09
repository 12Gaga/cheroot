import { TypeOfLabel } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfLabelSlice {
  item: TypeOfLabel[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewLabel extends BasicOption {
  name: string;
  price: number;
}

export interface updateLabel extends BasicOption {
  id: number | null;
  name: string;
  price: number;
}

export interface deleteLabel extends BasicOption {
  id: number;
}
