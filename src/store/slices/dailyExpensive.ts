import {
  addDailyExpensive,
  dailyExpensiveTypeSlice,
  deleteDailyExpensive,
  updateDailyExpensive,
} from "@/types/dailyExpensiveType";
import Config from "@/utils/config";
import { DailyExpensive } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: dailyExpensiveTypeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddDailyExpensive = createAsyncThunk(
  "dailyExpensive/AddDailyExpensive",
  async (option: addDailyExpensive, thunkApi) => {
    const { date, amount, content, expensiveLabelId, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/dailyExpensive?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, content, expensiveLabelId }),
        }
      );
      const { addDailyExpensive } = await response.json();
      thunkApi.dispatch(addedDailyExpensive(addDailyExpensive));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedDailyExpensive = createAsyncThunk(
  "dailyExpensive/UpdatedDailyExpensive",
  async (option: updateDailyExpensive, thunkApi) => {
    const { amount, expensiveLabelId, id, date, content, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/dailyExpensive?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, expensiveLabelId, id, content }),
        }
      );
      const { updateDailyExpensive } = await response.json();
      thunkApi.dispatch(updatedDailyExpensive(updateDailyExpensive));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedDailyExpensive = createAsyncThunk(
  "dailyExpensive/DeletedDailyExpensive",
  async (option: deleteDailyExpensive, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/dailyExpensive?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedDailyExpensive(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const DailyExpensiveSlice = createSlice({
  name: "dailyExpensive",
  initialState,
  reducers: {
    setDailyExpensive: (state, action: PayloadAction<DailyExpensive[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedDailyExpensive: (state, action: PayloadAction<DailyExpensive>) => {
      state.item = [...state.item, action.payload];
    },
    updatedDailyExpensive: (state, action: PayloadAction<DailyExpensive>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedDailyExpensive: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setDailyExpensive,
  setIsLoading,
  addedDailyExpensive,
  updatedDailyExpensive,
  deletedDailyExpensive,
} = DailyExpensiveSlice.actions;
export default DailyExpensiveSlice.reducer;
