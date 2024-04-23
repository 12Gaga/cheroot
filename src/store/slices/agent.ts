import { agentSlice, createNewAgent } from "@/types/agentType";
import Config from "@/utils/config";
import { Agent, WorkShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const { newAgent } = await response.json();
      thunkApi.dispatch(addAgent(newAgent));
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
  },
});

export const { setAgent, setIsLoading, addAgent } = AgentSlice.actions;
export default AgentSlice.reducer;
