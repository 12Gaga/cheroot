import {
  addMainMoney,
  deleteMainMoney,
  mainMoneyTypeSlice,
  updateMainMoney,
} from "@/types/mainMoneyType";
import Config from "@/utils/config";
import { MainMoney } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: mainMoneyTypeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddMainMoney = createAsyncThunk(
  "mainMoney/AddMainMoney",
  async (option: addMainMoney, thunkApi) => {
    const { date, amount, locationId, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/mainMoney?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, locationId }),
        }
      );
      const { addMainMoney } = await response.json();
      thunkApi.dispatch(addedMainMoney(addMainMoney));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedMainMoney = createAsyncThunk(
  "mainMoney/UpdatedMainMoney",
  async (option: updateMainMoney, thunkApi) => {
    const { amount, locationId, id, date, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/mainMoney?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, locationId, id }),
        }
      );
      const { updateMainMoney } = await response.json();
      thunkApi.dispatch(updatedMainMoney(updateMainMoney));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedMainMoney = createAsyncThunk(
  "mainMoney/DeletedMainMoney",
  async (option: deleteMainMoney, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/mainMoney?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedMainMoney(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const MainMoneySlice = createSlice({
  name: "mainMoney",
  initialState,
  reducers: {
    setMainMoney: (state, action: PayloadAction<MainMoney[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedMainMoney: (state, action: PayloadAction<MainMoney>) => {
      state.item = [...state.item, action.payload];
    },
    updatedMainMoney: (state, action: PayloadAction<MainMoney>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedMainMoney: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setMainMoney,
  setIsLoading,
  addedMainMoney,
  updatedMainMoney,
  deletedMainMoney,
} = MainMoneySlice.actions;
export default MainMoneySlice.reducer;
