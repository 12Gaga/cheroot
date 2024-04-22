import { ConveyLocation, Garage } from "@prisma/client";
import { BasicOption } from "./appType";

export interface conveyLocationSlice {
  item: ConveyLocation[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewConveyLocation extends BasicOption {
  name: string;
}