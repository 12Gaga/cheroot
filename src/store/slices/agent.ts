import {
  agentSlice,
  createNewAgent,
  deleteAgent,
  updateAgent,
} from "@/types/agentType";
import Config from "@/utils/config";
import { Agent, WorkShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAgentRemainCash } from "./agentRemainCash";

const initialState: agentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateAgent = createAsyncThunk(
  "agent/CreateAgent",
  async (option: createNewAgent, thunkApi) => {
    const { name, phoneNo, address, cashBig, cashSmall, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/agentname?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, phoneNo, address, cashBig, cashSmall }),
        }
      );
      const { newAgent, newRemainCash } = await response.json();
      thunkApi.dispatch(addAgent(newAgent));
      thunkApi.dispatch(addAgentRemainCash(newRemainCash));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedAgent = createAsyncThunk(
  "agent/UpdatedAgent",
  async (option: updateAgent, thunkApi) => {
    const {
      id,
      name,
      phoneNo,
      address,
      cashBig,
      cashSmall,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/agentname?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNo,
            address,
            cashBig,
            cashSmall,
            id,
          }),
        }
      );
      const { updateAgent } = await response.json();
      thunkApi.dispatch(updatedAgent(updateAgent));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedAgent = createAsyncThunk(
  "agent/DeletedAgent",
  async (option: deleteAgent, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/agentname?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedAgent(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const AgentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<Agent[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.item = [...state.item, action.payload];
    },
    updatedAgent: (state, action: PayloadAction<Agent>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedAgent: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const { setAgent, setIsLoading, addAgent, updatedAgent, deletedAgent } =
  AgentSlice.actions;
export default AgentSlice.reducer;
