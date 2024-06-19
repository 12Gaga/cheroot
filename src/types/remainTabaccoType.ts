import { AgentLeftTabacco } from "@prisma/client";
import { BasicOption } from "./appType";

export interface agentRemainTabaccoType {
  item: AgentLeftTabacco[];
  isLoading: boolean;
  error: null | string;
}

export interface createAgentRemainTabacco extends BasicOption {
  agentId: number | undefined;
  typeOfCherootId: number | undefined;
  typeOfTabaccoId: number | undefined;
  tin: number;
  pyi: number;
}
