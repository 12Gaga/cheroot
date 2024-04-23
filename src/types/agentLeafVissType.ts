import { AgentLeafViss } from "@prisma/client";
import { BasicOption } from "./appType";

export interface agentLeafVissSlice {
  item: AgentLeafViss[];
  isLoading: boolean;
  error: null | string;
}

export interface CreateNewAgentLeafViss extends BasicOption {
  agentId: number | undefined;
  typeOfLeafId: number | undefined;
  viss: number;
}
