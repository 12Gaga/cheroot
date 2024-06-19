import {
  agentRemainFilterSizeType,
  createAgentRemainFilterSize,
} from "@/types/remainFiltersizeType";
import Config from "@/utils/config";
import { AgentLeftFilterSize } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: agentRemainFilterSizeType = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateAgentRemainFilterSize = createAsyncThunk(
  "agentReminFilterSize/CreateAgentRemainFilterSize",
  async (option: createAgentRemainFilterSize, thunkApi) => {
    const {
      agentId,
      typeOfCherootId,
      typeOfFilterSizeId,
      quantity,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/remainFilterSize?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            agentId,
            typeOfCherootId,
            typeOfFilterSizeId,
            quantity,
          }),
        }
      );
      const { newRemainFilterSize } = await response.json();
      thunkApi.dispatch(addAgentRemainFilter(newRemainFilterSize));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const AgetnRemainFilterSlice = createSlice({
  name: "agentReminFilterSize",
  initialState,
  reducers: {
    setAgentRemainFilter: (
      state,
      action: PayloadAction<AgentLeftFilterSize[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgentRemainFilter: (
      state,
      action: PayloadAction<AgentLeftFilterSize>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedAgentRemainFilter: (
      state,
      action: PayloadAction<AgentLeftFilterSize>
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
  setAgentRemainFilter,
  setIsLoading,
  addAgentRemainFilter,
  updatedAgentRemainFilter,
} = AgetnRemainFilterSlice.actions;
export default AgetnRemainFilterSlice.reducer;
