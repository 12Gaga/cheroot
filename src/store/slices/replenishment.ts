import {
  addReplenishment,
  deleteReplenishment,
  replenishmentTypeSlice,
  updateReplenishment,
} from "@/types/replenishmentType";
import Config from "@/utils/config";
import { ReplenishmentMoney } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: replenishmentTypeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddReplenishment = createAsyncThunk(
  "replenishment/AddReplenishment",
  async (option: addReplenishment, thunkApi) => {
    const { date, amount, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/replenishment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount }),
        }
      );
      const { addReplenishment } = await response.json();
      thunkApi.dispatch(addedReplenishment(addReplenishment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedReplenishment = createAsyncThunk(
  "replenishment/UpdatedReplenishment",
  async (option: updateReplenishment, thunkApi) => {
    const { amount, id, date, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/replenishment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, id }),
        }
      );
      const { updateReplenishment } = await response.json();
      thunkApi.dispatch(updatedReplenishment(updateReplenishment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedReplenishment = createAsyncThunk(
  "replenishment/DeletedReplishment",
  async (option: deleteReplenishment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/replenishment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedReplenishment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const ReplenishmentSlice = createSlice({
  name: "replenishment",
  initialState,
  reducers: {
    setReplenishment: (state, action: PayloadAction<ReplenishmentMoney[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedReplenishment: (state, action: PayloadAction<ReplenishmentMoney>) => {
      state.item = [...state.item, action.payload];
    },
    updatedReplenishment: (
      state,
      action: PayloadAction<ReplenishmentMoney>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedReplenishment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setReplenishment,
  setIsLoading,
  addedReplenishment,
  updatedReplenishment,
  deletedReplenishment,
} = ReplenishmentSlice.actions;
export default ReplenishmentSlice.reducer;
