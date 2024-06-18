import { RemainCash } from "@/types/agentLeafVissType";
import { AgentRemainCash } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RemainCash = {
  item: [],
  isLoading: false,
  error: null,
};

const AgentRemainCashSlice = createSlice({
  name: "agentRemainCash",
  initialState,
  reducers: {
    setAgentRemainCash: (state, action: PayloadAction<AgentRemainCash[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgentRemainCash: (state, action: PayloadAction<AgentRemainCash>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setAgentRemainCash, setIsLoading, addAgentRemainCash } =
  AgentRemainCashSlice.actions;
export default AgentRemainCashSlice.reducer;
