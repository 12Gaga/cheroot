import { AgentLeftLabel } from "@prisma/client";
import { BasicOption } from "./appType";

export interface agentRemainLabelType {
  item: AgentLeftLabel[];
  isLoading: boolean;
  error: null | string;
}

export interface createAgentRemainLabel extends BasicOption {
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  typeOfLabelId: number | undefined;
  bandle: number;
}
