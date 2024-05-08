import { ExpensiveLabel } from "@prisma/client";
import { BasicOption } from "./appType";

export interface typeOfMoneyTitle {
  item: ExpensiveLabel[];
  isLoading: boolean;
  error: null | string;
}

export interface createNewTitle extends BasicOption {
  name: string;
}

export interface updateTitle extends BasicOption {
  id: number | null;
  name: string;
}
