import {
  createNewPayStock,
  deletePayStock,
  payStockSlice,
} from "@/types/payStockType";
import Config from "@/utils/config";
import { PayLeaf, PayOtherItem, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: payStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatePayStock = createAsyncThunk(
  "payStock/CreatePayStock",
  async (option: createNewPayStock, thunkApi) => {
    const {
      date,
      agentId,
      typeOfCherootId,
      cherootQty,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      typeOfTabaccoId,
      tabaccoQty,
      tabaccoTin,
      tabaccoPyi,
      tabaccoBag,
      typeOfLabelId,
      labelBandle,
      totalPrice,
      garageId,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/payStock?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfCherootId,
            cherootQty,
            typeOfFilterSizeId,
            filterSizeQty,
            filterSizeBag,
            typeOfTabaccoId,
            tabaccoQty,
            tabaccoTin,
            tabaccoPyi,
            tabaccoBag,
            typeOfLabelId,
            labelBandle,
            totalPrice,
            garageId,
          }),
        }
      );
      const { newPayStock } = await response.json();
      thunkApi.dispatch(addPayStock(newPayStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedPayStock = createAsyncThunk(
  "payStock/DeletedPayStock",
  async (option: deletePayStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/payStock?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedPayStock(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const PayStockSlice = createSlice({
  name: "payStock",
  initialState,
  reducers: {
    setPayStock: (state, action: PayloadAction<PayOtherItem[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addPayStock: (state, action: PayloadAction<PayOtherItem>) => {
      state.item = [...state.item, action.payload];
    },
    deletedPayStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const { setPayStock, setIsLoading, addPayStock, deletedPayStock } =
  PayStockSlice.actions;
export default PayStockSlice.reducer;
