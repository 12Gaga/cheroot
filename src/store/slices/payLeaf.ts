import {
  createNewPayLeaf,
  deletePayLeaf,
  payLeafSlice,
} from "@/types/payLeafType";
import Config from "@/utils/config";
import { PayLeaf, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletedPayLeafStock } from "./leafStock";
import { addAgentRemainLeaf, deletedAgentRemainLeaf } from "./agentRemainLeaf";

const initialState: payLeafSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatePayLeaf = createAsyncThunk(
  "payLeaf/CreatePayLeaf",
  async (option: createNewPayLeaf, thunkApi) => {
    const {
      date,
      agentId,
      typeOfLeafId,
      batchNo,
      viss,
      discountViss,
      netViss,
      price,
      amount,
      garageId,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/payLeaf?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfLeafId,
            batchNo,
            viss,
            discountViss,
            netViss,
            price,
            amount,
            garageId,
          }),
        }
      );
      const { newPayLeaf, newRemainLeaf } = await response.json();
      thunkApi.dispatch(addPayleaf(newPayLeaf));
      thunkApi.dispatch(addAgentRemainLeaf(newRemainLeaf));
      // thunkApi.dispatch(deletedPayLeafStock(batchNo));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedPayLeaf = createAsyncThunk(
  "payLeaf/DeletedPayLeaf",
  async (option: deletePayLeaf, thunkApi) => {
    const { seq, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/payLeaf?seq=${seq}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedPayLeaf(seq));
      thunkApi.dispatch(deletedAgentRemainLeaf(seq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const PayLeafSlice = createSlice({
  name: "payLeaf",
  initialState,
  reducers: {
    setPayLeaf: (state, action: PayloadAction<PayLeaf[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addPayleaf: (state, action: PayloadAction<PayLeaf>) => {
      state.item = [...state.item, action.payload];
    },
    deletedPayLeaf: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.seq != action.payload);
    },
  },
});

export const { setPayLeaf, setIsLoading, addPayleaf, deletedPayLeaf } =
  PayLeafSlice.actions;
export default PayLeafSlice.reducer;
