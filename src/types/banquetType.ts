import { Banquet } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfBanquetSlice {
  item: Banquet[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewBanquet extends BasicOption {
  name: string;
  cigratteIndustryId: number | undefined;
}

export interface updateBanquet extends BasicOption {
  id: number | null;
  name: string;
}
