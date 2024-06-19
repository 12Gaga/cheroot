import { Agent } from "@prisma/client";
import { BasicOption } from "./appType";

export interface agentSlice {
  item: Agent[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewAgent extends BasicOption {
  name: string;
  phoneNo: string;
  address: string;
  cashBig: number | undefined;
  cashSmall: number | undefined;
}

export interface updateAgent extends BasicOption {
  id: number | null;
  name: string;
  phoneNo: string;
  address: string;
  cashBig: number | undefined;
  cashSmall: number | undefined;
}

export interface deleteAgent extends BasicOption {
  id: number;
}

export interface selectedAgent {
  agentId: number | undefined;
  phoneNo: string;
  address: string;
  cashBig: number | undefined;
  cashSmall: number | undefined;
  totalLeafViss: number;
}
