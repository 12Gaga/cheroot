import { createNewPayLeaf, payLeafSlice } from "@/types/payLeafType";
import Config from "@/utils/config";
import { PayLeaf, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const { newPayLeaf } = await response.json();
      thunkApi.dispatch(addPayleaf(newPayLeaf));
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
  },
});

export const { setPayLeaf, setIsLoading, addPayleaf } = PayLeafSlice.actions;
export default PayLeafSlice.reducer;
