import { CigratteIndustry } from "@prisma/client";

export interface industrySlice {
  item: CigratteIndustry | null;
  isLoading: boolean;
  error: null | string;
}
