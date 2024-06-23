import {
  compensationFilterSize,
  createCompensationFilterSize,
  deleteCompensationFilterSize,
} from "@/types/compensationFilterType";
import Config from "@/utils/config";
import { CompensationFilterSize } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: compensationFilterSize = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatedCompensationFilterSize = createAsyncThunk(
  "compensationFilterSize/CreateCompensationFilterSize",
  async (option: createCompensationFilterSize, thunkApi) => {
    const {
      date,
      agentId,
      typeOfCherootId,
      typeOfFilterId,
      remainQty,
      compensationQty,
      takeMoneyQty,
      filterPrice,
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
        `${Config.apiBaseUrl}/compensationFilter?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfCherootId,
            typeOfFilterId,
            remainQty,
            compensationQty,
            takeMoneyQty,
            filterPrice,
            tolAmount,
            addCashBig,
            addCashsmall,
            inCash,
          }),
        }
      );
      const { newCompensationFilter } = await response.json();
      thunkApi.dispatch(addCompensationFilterSize(newCompensationFilter));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedCompensationFilterSize = createAsyncThunk(
  "compensationFilterSize/CreateCompensationFilterSize",
  async (option: deleteCompensationFilterSize, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/compensationFilter?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedCompensationFilterSize(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const CompensationFilterSizSlice = createSlice({
  name: "compensationFilterSize",
  initialState,
  reducers: {
    setCompensationFilterSize: (
      state,
      action: PayloadAction<CompensationFilterSize[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCompensationFilterSize: (
      state,
      action: PayloadAction<CompensationFilterSize>
    ) => {
      state.item = [...state.item, action.payload];
    },
    deletedCompensationFilterSize: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setCompensationFilterSize,
  setIsLoading,
  addCompensationFilterSize,
  deletedCompensationFilterSize,
} = CompensationFilterSizSlice.actions;
export default CompensationFilterSizSlice.reducer;
