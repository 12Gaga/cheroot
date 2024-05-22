import { Conveying } from "@prisma/client";
import { BasicOption } from "./appType";

export interface cherootTransferSlice {
  item: Conveying[];
  isLoading: boolean;
  error: null | string;
}

export interface addCherootTransfer extends BasicOption {
  date: string;
  conveyLocationId: number | null;
  typeOfCherootId: number | null;
  typeOfPackingId: number | null;
  formOfPackingId: number | null;
  quantity: number;
  amount: number;
  totalPrice: number;
}

export interface updateCherootTransfer extends BasicOption {
  id: number | null;
  date: string;
  conveyLocationId: number | null;
  typeOfCherootId: number | null;
  typeOfPackingId: number | null;
  formOfPackingId: number | null;
  quantity: number;
  amount: number;
  totalPrice: number;
}

export interface deleteCherootTransfer extends BasicOption {
  id: number;
}
