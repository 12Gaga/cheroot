import { Agent } from "@prisma/client";
import { BasicOption } from "./appType";

export interface agentSlice {
  item: Agent[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewAgent extends BasicOption {
  name: string;
  phoneNo: number | undefined;
  address: string;
  cashBig: number | undefined;
  cashSmall: number | undefined;
}
