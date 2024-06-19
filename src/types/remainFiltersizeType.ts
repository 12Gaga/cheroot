import { AgentLeftFilterSize } from "@prisma/client";
import { BasicOption } from "./appType";

export interface agentRemainFilterSizeType {
  item: AgentLeftFilterSize[];
  isLoading: boolean;
  error: null | string;
}

export interface createAgentRemainFilterSize extends BasicOption {
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  typeOfFilterSizeId: number | undefined;
  quantity: number;
}
