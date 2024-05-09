import { TypeOfPlastic } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfPlasticSlice {
  item: TypeOfPlastic[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewPlastic extends BasicOption {
  name: string;
}

export interface updatePlastic extends BasicOption {
  id: number | null;
  name: string;
}

export interface deletePlastic extends BasicOption {
  id: number;
}
