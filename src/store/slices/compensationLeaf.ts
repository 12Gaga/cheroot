import {
  compensationLeaf,
  createCompensationLeaf,
  deleteCompensationLeaf,
} from "@/types/compensationLeafType";
import Config from "@/utils/config";
import { CompensationLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: compensationLeaf = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatedCompensationLeaf = createAsyncThunk(
  "compensationLeaf/CreateCompensationLeaf",
  async (option: createCompensationLeaf, thunkApi) => {
    const {
      date,
      agentId,
      typeOfLeafId,
      remainViss,
      compensationViss,
      takeMoneyViss,
      leafPrice,
      tolAmount,
      addCashBig,
      addCashsmall,
      inCash,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/compensationLeaf?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfLeafId,
            remainViss,
            compensationViss,
            takeMoneyViss,
            leafPrice,
            tolAmount,
            addCashBig,
            addCashsmall,
            inCash,
          }),
        }
      );
      const { newCompensationLeaf } = await response.json();
      thunkApi.dispatch(addCompensationLeaf(newCompensationLeaf));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedCompensationLeaf = createAsyncThunk(
  "cherootTransfer/DeletedCherootTransfer",
  async (option: deleteCompensationLeaf, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/compensationLeaf?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedCompensationLeaf(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const CompensationLeafSlice = createSlice({
  name: "compensationLeaf",
  initialState,
  reducers: {
    setCompensationLeaf: (state, action: PayloadAction<CompensationLeaf[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCompensationLeaf: (state, action: PayloadAction<CompensationLeaf>) => {
      state.item = [...state.item, action.payload];
    },
    deletedCompensationLeaf: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setCompensationLeaf,
  setIsLoading,
  addCompensationLeaf,
  deletedCompensationLeaf,
} = CompensationLeafSlice.actions;
export default CompensationLeafSlice.reducer;
