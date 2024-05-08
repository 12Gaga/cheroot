import { Store } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfStoreSlice {
  item: Store[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewStore extends BasicOption {
  name: string;
  cigratteIndustryId: number | undefined;
}

export interface updateStore extends BasicOption {
  id: number | null;
  name: string;
}
