import { RemainLeaf } from "@/types/agentLeafVissType";
import { AgentRemineLeaf } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RemainLeaf = {
  item: [],
  isLoading: false,
  error: null,
};

const AgentRemainLeaf = createSlice({
  name: "agentRemainLeaf",
  initialState,
  reducers: {
    setAgentRemainLeaf: (state, action: PayloadAction<AgentRemineLeaf[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgentRemainLeaf: (state, action: PayloadAction<AgentRemineLeaf>) => {
      state.item = [...state.item, action.payload];
    },
    deletedAgentRemainLeaf: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.seq != action.payload);
    },
  },
});

export const {
  setAgentRemainLeaf,
  setIsLoading,
  addAgentRemainLeaf,
  deletedAgentRemainLeaf,
} = AgentRemainLeaf.actions;
export default AgentRemainLeaf.reducer;
