import { CreateNewLeaf, typeOfLeafSlice } from "@/types/LeafType";
import {
  CreateNewAgentLeafViss,
  agentLeafVissSlice,
} from "@/types/agentLeafVissType";
import Config from "@/utils/config";
import { AgentLeafViss, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: agentLeafVissSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateAgentLeafViss = createAsyncThunk(
  "agentLeafViss/CreateAgentLeafViss",
  async (option: CreateNewAgentLeafViss, thunkApi) => {
    const { agentId, typeOfLeafId, viss, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/agentLeafViss?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ agentId, typeOfLeafId, viss }),
        }
      );
      const { newAgentLeafViss } = await response.json();
      thunkApi.dispatch(addAgentLeafViss(newAgentLeafViss));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const AgentLeafVissSlice = createSlice({
  name: "agentLeafViss",
  initialState,
  reducers: {
    setAgentLeafViss: (state, action: PayloadAction<AgentLeafViss[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgentLeafViss: (state, action: PayloadAction<AgentLeafViss>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setAgentLeafViss, setIsLoading, addAgentLeafViss } =
  AgentLeafVissSlice.actions;
export default AgentLeafVissSlice.reducer;
