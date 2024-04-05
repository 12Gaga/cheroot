import { AgentNameSlice, SaveAgentOption } from "@/types/agentSlice";
import Config from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AgentNameSlice = {
  item: [],
  loading: false,
  error: null,
};

export const SaveAgentInfo = createAsyncThunk(
  "agentName/SaveAgentInfo",
  async (option: SaveAgentOption, thunkApi) => {
    const {
      name,
      phoneno,
      address,
      cashBig,
      cashSmall,
      five,
      four,
      two,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/agent`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          phoneno,
          address,
          cashBig,
          cashSmall,
          five,
          four,
          two,
        }),
      });
      const data = response.json();
      thunkApi.dispatch(setName(data));
      onSuccess && onSuccess;
    } catch (err) {
      onError && onError(err);
    }
  }
);

const AgentName = createSlice({
  name: "agentName",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setName } = AgentName.actions;
export default AgentName.reducer;
