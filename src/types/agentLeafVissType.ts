import { AgentLeafViss, AgentRemainCash } from "@prisma/client";
import { BasicOption } from "./appType";
import { AgentRemineLeaf } from "@prisma/client";

export interface RemainLeaf {
  item: AgentRemineLeaf[];
  isLoading: boolean;
  error: null | string;
}

export interface RemainCash {
  item: AgentRemainCash[];
  isLoading: boolean;
  error: null | string;
}

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

export interface updateAgentLeafViss extends BasicOption {
  id: number | null;
  agentId: number | undefined;
  typeOfLeafId: number | undefined;
  viss: number;
}
export interface deleteAgentLeafViss extends BasicOption {
  id: number;
}
