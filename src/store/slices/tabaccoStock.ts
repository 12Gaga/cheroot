import {
  createNewTabaccoAddStock,
  createNewTabaccoStock,
  tabaccoStockSlice,
  updateTabaccoAddStock,
  updateTabaccoStock,
} from "@/types/tabaccoStockType";
import Config from "@/utils/config";
import { Leaf, Tabacco } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock, deletedAddStock, updatedAddStock } from "./addStock";
import {
  deleteFilterSizeAddStock,
  deleteFilterSizeStock,
} from "@/types/filterSizeStockType";

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
      shopId,
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
          shopId,
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

export const UpdatedTabaccoStock = createAsyncThunk(
  "tabaccoStock/UpdatedTabaccoStock",
  async (option: updateTabaccoStock, thunkApi) => {
    const {
      id,
      date,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/tabaccoStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          date,
          typeOfTabaccoId,
          tin,
          pyi,
          bag,
          garageId,
          shopId,
        }),
      });
      const { updateTabaccoStock } = await response.json();
      thunkApi.dispatch(updatedTabaccoStock(updateTabaccoStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTabaccoStock = createAsyncThunk(
  "tabaccoStock/DeletedTabaccoStock",
  async (option: deleteFilterSizeStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoStock?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTabaccoStock(id));
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
      shopId,
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
            shopId,
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

export const UpdatedTabaccoAddStock = createAsyncThunk(
  "tabaccoAddStock/UpdateTabaccoAddStock",
  async (option: updateTabaccoAddStock, thunkApi) => {
    const {
      stockSeq,
      date,
      invNo,
      carNo,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoStock?invNo=${invNo}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            stockSeq,
            date,
            invNo,
            carNo,
            typeOfTabaccoId,
            tin,
            pyi,
            bag,
            garageId,
            shopId,
          }),
        }
      );
      const { updateTabaccoAddStock, updateAddStock } = await response.json();
      thunkApi.dispatch(updatedTabaccoAddStock(updateTabaccoAddStock));
      thunkApi.dispatch(updatedAddStock(updateAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTabaccoAddStock = createAsyncThunk(
  "tabaccoAddStock/DeletedTabaccoAddStock",
  async (option: deleteFilterSizeAddStock, thunkApi) => {
    const { stockSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoStock?stockSeq=${stockSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTabaccoAddStock(stockSeq));
      thunkApi.dispatch(deletedAddStock(stockSeq));
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
    updatedTabaccoStock: (state, action: PayloadAction<Tabacco>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedTabaccoStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
    updatedTabaccoAddStock: (state, action: PayloadAction<Tabacco>) => {
      state.item = state.item.map((item) =>
        item.stockSeq === action.payload.stockSeq ? action.payload : item
      );
    },
    deletedTabaccoAddStock: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.stockSeq != action.payload);
    },
  },
});

export const {
  setTabaccoStock,
  setIsLoading,
  addTabaccoStock,
  updatedTabaccoStock,
  deletedTabaccoStock,
  updatedTabaccoAddStock,
  deletedTabaccoAddStock,
} = TabaccoStockSlice.actions;
export default TabaccoStockSlice.reducer;
