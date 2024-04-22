import { FormOfPacking } from "@prisma/client";
import { BasicOption } from "./appType";

export interface formOfPackingSlice {
  item: FormOfPacking[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewFormOfPacking extends BasicOption {
  name: string;
  typeOfCherootId: number | undefined;
  typeOfPackingId: number | undefined;
  quantity: number;
}
