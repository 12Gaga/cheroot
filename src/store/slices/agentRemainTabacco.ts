import {
  agentRemainTabaccoType,
  createAgentRemainTabacco,
} from "@/types/remainTabaccoType";
import Config from "@/utils/config";
import { AgentLeftTabacco } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: agentRemainTabaccoType = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateAgentRemainTabacco = createAsyncThunk(
  "agentReminTabacco/CreateAgentRemainTabacco",
  async (option: createAgentRemainTabacco, thunkApi) => {
    const {
      agentId,
      typeOfCherootId,
      typeOfTabaccoId,
      tin,
      pyi,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/remainTabacco?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            agentId,
            typeOfCherootId,
            typeOfTabaccoId,
            tin,
            pyi,
          }),
        }
      );
      const { newRemainTabacco } = await response.json();
      thunkApi.dispatch(addAgentRemainTabacco(newRemainTabacco));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const AgetnRemainTabacco = createSlice({
  name: "agentReminTabacco",
  initialState,
  reducers: {
    setAgentRemainTabacco: (
      state,
      action: PayloadAction<AgentLeftTabacco[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgentRemainTabacco: (state, action: PayloadAction<AgentLeftTabacco>) => {
      state.item = [...state.item, action.payload];
    },
    updatedAgentRemainTabacco: (
      state,
      action: PayloadAction<AgentLeftTabacco>
    ) => {
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
  setAgentRemainTabacco,
  setIsLoading,
  addAgentRemainTabacco,
  updatedAgentRemainTabacco,
} = AgetnRemainTabacco.actions;
export default AgetnRemainTabacco.reducer;
