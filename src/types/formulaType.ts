import { Formula } from "@prisma/client";
import { BasicOption } from "./appType";

export interface formulaSlice {
  item: Formula[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewFormula extends BasicOption {
  typeOfCherootId: number | undefined;
  cherootQty: number;
  typeOfFilterSizeId: number | undefined;
  filterSizeQty: number;
  filterSizeBag: number;
  typeOfTabaccoId: number | undefined;
  tabaccoQty: number;
  tin: number;
  pyi: number;
}
