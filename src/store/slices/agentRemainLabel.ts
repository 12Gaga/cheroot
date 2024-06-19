import {
  agentRemainLabelType,
  createAgentRemainLabel,
} from "@/types/remainLabelType";
import Config from "@/utils/config";
import { AgentLeftLabel } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: agentRemainLabelType = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateAgentRemainLabel = createAsyncThunk(
  "agentReminLabel/CreateAgentRemainLabel",
  async (option: createAgentRemainLabel, thunkApi) => {
    const {
      agentId,
      typeOfCherootId,
      typeOfLabelId,
      bandle,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/remainLabel?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            agentId,
            typeOfCherootId,
            typeOfLabelId,
            bandle,
          }),
        }
      );
      const { newRemainLabel } = await response.json();
      thunkApi.dispatch(addAgentRemainLabel(newRemainLabel));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const AgetnRemainLabel = createSlice({
  name: "agentReminLabel",
  initialState,
  reducers: {
    setAgentRemainLabel: (state, action: PayloadAction<AgentLeftLabel[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgentRemainLabel: (state, action: PayloadAction<AgentLeftLabel>) => {
      state.item = [...state.item, action.payload];
    },
    updatedAgentRemainLabel: (state, action: PayloadAction<AgentLeftLabel>) => {
      state.item = state.item.map((item) =>
        item.typeOfCherootId === action.payload.typeOfCherootId &&
        item.agentId === action.payload.agentId
          ? action.payload
          : item
      );
    },
  },
});

export const {
  setAgentRemainLabel,
  setIsLoading,
  addAgentRemainLabel,
  updatedAgentRemainLabel,
} = AgetnRemainLabel.actions;
export default AgetnRemainLabel.reducer;
