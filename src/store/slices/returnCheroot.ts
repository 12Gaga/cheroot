import { createNewPayLeaf, payLeafSlice } from "@/types/payLeafType";
import {
  createNewReturnCheroot,
  returnCherootSlice,
} from "@/types/returnCherootType";
import Config from "@/utils/config";
import { PayLeaf, ReturnReadyCheroot, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: returnCherootSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateReturnCheroot = createAsyncThunk(
  "returnCheroot/CreateReturnCheroot",
  async (option: createNewReturnCheroot, thunkApi) => {
    const {
      date,
      agentId,
      typeOfCherootId,
      goodQty,
      damage,
      totalCherootQty,
      goodPrice,
      amount,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/returnCheroot?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfCherootId,
            goodQty,
            damage,
            totalCherootQty,
            goodPrice,
            amount,
          }),
        }
      );
      const { newReturnCheroot } = await response.json();
      thunkApi.dispatch(addReturnCheroot(newReturnCheroot));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const ReturnCherootSlice = createSlice({
  name: "returnCheroot",
  initialState,
  reducers: {
    setReturnCheroot: (state, action: PayloadAction<ReturnReadyCheroot[]>) => {
      state.item = action.payload;
    },
    setLoadingReturnCheroot: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addReturnCheroot: (state, action: PayloadAction<ReturnReadyCheroot[]>) => {
      state.item = [...state.item, ...action.payload];
    },
    deletedReturnCheroot: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.seq != action.payload);
    },
  },
});

export const {
  setReturnCheroot,
  setLoadingReturnCheroot,
  addReturnCheroot,
  deletedReturnCheroot,
} = ReturnCherootSlice.actions;
export default ReturnCherootSlice.reducer;
