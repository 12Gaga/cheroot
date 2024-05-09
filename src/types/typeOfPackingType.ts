import { Garage, TypeOfPacking } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfPackingSlice {
  item: TypeOfPacking[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewTypeOfPacking extends BasicOption {
  name: string;
  typeOfCherootId: number | undefined;
}

export interface updateTypeOfPacking extends BasicOption {
  id: number | null;
  name: string;
  typeOfCherootId: number | undefined;
}

export interface deleteTypeOfPacking extends BasicOption {
  id: number;
}
