import {
  compensationLabel,
  createCompensationLabel,
  deleteCompensationLabel,
} from "@/types/compensationLabelType";
import Config from "@/utils/config";
import { CompensationLabel } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: compensationLabel = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatedCompensationLabel = createAsyncThunk(
  "compensationLabel/CreateCompensationLabel",
  async (option: createCompensationLabel, thunkApi) => {
    const {
      date,
      agentId,
      typeOfCherootId,
      typeOfLabelId,
      remainBandel,
      compensationBandle,
      takeMoneyBandle,
      labelPrice,
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
        `${Config.apiBaseUrl}/compensationLabel?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfCherootId,
            typeOfLabelId,
            remainBandel,
            compensationBandle,
            takeMoneyBandle,
            labelPrice,
            tolAmount,
            addCashBig,
            addCashsmall,
            inCash,
          }),
        }
      );
      const { newCompensationLabel } = await response.json();
      thunkApi.dispatch(addCompensationLabel(newCompensationLabel));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedCompensationLabel = createAsyncThunk(
  "compensationLabel/CreateCompensationLabel",
  async (option: deleteCompensationLabel, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/compensationLabel?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedCompensationLabel(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const CompensationLabelSlice = createSlice({
  name: "compensationLabel",
  initialState,
  reducers: {
    setCompensationLabel: (
      state,
      action: PayloadAction<CompensationLabel[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCompensationLabel: (state, action: PayloadAction<CompensationLabel>) => {
      state.item = [...state.item, action.payload];
    },
    deletedCompensationLabel: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setCompensationLabel,
  setIsLoading,
  addCompensationLabel,
  deletedCompensationLabel,
} = CompensationLabelSlice.actions;
export default CompensationLabelSlice.reducer;
