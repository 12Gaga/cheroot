import {
  createNewTitle,
  typeOfMoneyTitle,
  updateTitle,
} from "@/types/moneyTitleType";
import Config from "@/utils/config";
import { ExpensiveLabel, Garage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfMoneyTitle = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateTitle = createAsyncThunk(
  "title/CreateTitle",
  async (option: createNewTitle, thunkApi) => {
    const { name, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/expensiveLabel?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newTitle } = await response.json();
      thunkApi.dispatch(addTitle(newTitle));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTitle = createAsyncThunk(
  "title/UpdateTitle",
  async (option: updateTitle, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/expensiveLabel?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, id }),
        }
      );
      const { updateTitle } = await response.json();
      thunkApi.dispatch(updatedTitle(updateTitle));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const ExpensiveLabelSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<ExpensiveLabel[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTitle: (state, action: PayloadAction<ExpensiveLabel>) => {
      state.item = [...state.item, action.payload];
    },
    updatedTitle: (state, action: PayloadAction<ExpensiveLabel>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setTitle, setIsLoading, addTitle, updatedTitle } =
  ExpensiveLabelSlice.actions;
export default ExpensiveLabelSlice.reducer;
