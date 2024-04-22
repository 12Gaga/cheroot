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
