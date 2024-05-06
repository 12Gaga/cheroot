import { ReturnReadyCheroot } from "@prisma/client";
import { BasicOption } from "./appType";

export interface returnCherootSlice {
  item: ReturnReadyCheroot[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewReturnCheroot extends BasicOption {
  date: string;
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  goodQty: number;
  damage: number;
  totalCherootQty: number;
  goodPrice: number;
  amount: number;
}
