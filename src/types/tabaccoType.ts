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
