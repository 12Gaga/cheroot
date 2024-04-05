import { AgentName } from "@prisma/client";

export interface BasicOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface AgentNameSlice {
  item: AgentName[];
  loading: boolean;
  error: Error | null;
}

export interface SaveAgentOption extends BasicOption {
  name: string;
  phoneno: string;
  address: string;
  cashBig: number;
  cashSmall: number;
  five: number;
  four: number;
  two: number;
}
