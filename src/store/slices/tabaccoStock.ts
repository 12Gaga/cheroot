import {
  createNewTabaccoAddStock,
  createNewTabaccoStock,
  tabaccoStockSlice,
} from "@/types/tabaccoStockType";
import Config from "@/utils/config";
import { Leaf, Tabacco } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock } from "./addStock";

const initialState: tabaccoStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateTabaccoStock = createAsyncThunk(
  "tabaccoStock/CreateTabaccoStock",
  async (option: createNewTabaccoStock, thunkApi) => {
    const {
      date,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      garageId,
      shop,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/tabaccoStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          typeOfTabaccoId,
          tin,
          pyi,
          bag,
          garageId,
          shop,
        }),
      });
      const { newTabaccoStock } = await response.json();
      thunkApi.dispatch(addTabaccoStock(newTabaccoStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreateTabaccoAddStock = createAsyncThunk(
  "tabaccoStock/CreateTabaccoAddStock",
  async (option: createNewTabaccoAddStock, thunkApi) => {
    const {
      date,
      invNo,
      carNo,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      garageId,
      shop,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            invNo,
            carNo,
            typeOfTabaccoId,
            tin,
            pyi,
            bag,
            garageId,
            shop,
          }),
        }
      );
      const { newTabaccoAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addTabaccoStock(newTabaccoAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TabaccoStockSlice = createSlice({
  name: "tabaccoStock",
  initialState,
  reducers: {
    setTabaccoStock: (state, action: PayloadAction<Tabacco[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTabaccoStock: (state, action: PayloadAction<Tabacco>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setTabaccoStock, setIsLoading, addTabaccoStock } =
  TabaccoStockSlice.actions;
export default TabaccoStockSlice.reducer;
