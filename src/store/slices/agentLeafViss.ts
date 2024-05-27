import { CreateNewLeaf, typeOfLeafSlice } from "@/types/LeafType";
import {
  CreateNewAgentLeafViss,
  agentLeafVissSlice,
  deleteAgentLeafViss,
  updateAgentLeafViss,
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

export const UpdatedAgentLeafViss = createAsyncThunk(
  "agentLeafViss/UpdatedAgentLeafViss",
  async (option: updateAgentLeafViss, thunkApi) => {
    const { id, agentId, typeOfLeafId, viss, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/agentLeafViss?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            agentId,
            typeOfLeafId,
            viss,
            id,
          }),
        }
      );
      const { updateAgentLeafViss } = await response.json();
      thunkApi.dispatch(updatedAgentLeafViss(updateAgentLeafViss));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedAgentLeafViss = createAsyncThunk(
  "agentLeafViss/DeletedAgentLeafViss",
  async (option: deleteAgentLeafViss, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/agentLeafViss?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedAgentLeafViss(id));
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
    updatedAgentLeafViss: (state, action: PayloadAction<AgentLeafViss>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedAgentLeafViss: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setAgentLeafViss,
  setIsLoading,
  addAgentLeafViss,
  updatedAgentLeafViss,
  deletedAgentLeafViss,
} = AgentLeafVissSlice.actions;
export default AgentLeafVissSlice.reducer;
