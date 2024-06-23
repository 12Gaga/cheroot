import {
  compensationTabacco,
  createCompensationTabacco,
  deleteCompensationTabacco,
} from "@/types/compensationTabaccoType";
import Config from "@/utils/config";
import { CompensationTabacco } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: compensationTabacco = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatedCompensationTabacco = createAsyncThunk(
  "compensationTabacco/CreateCompensationTabacco",
  async (option: createCompensationTabacco, thunkApi) => {
    const {
      date,
      agentId,
      typeOfCherootId,
      typeOfTabaccoId,
      remainPyi,
      compensationPyi,
      takeMoneyPyi,
      tabaccoPrice,
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
        `${Config.apiBaseUrl}/compensationTabacco?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfCherootId,
            typeOfTabaccoId,
            remainPyi,
            compensationPyi,
            takeMoneyPyi,
            tabaccoPrice,
            tolAmount,
            addCashBig,
            addCashsmall,
            inCash,
          }),
        }
      );
      const { newCompensationTabacco } = await response.json();
      thunkApi.dispatch(addCompensationTabacco(newCompensationTabacco));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedCompensationTabacco = createAsyncThunk(
  "compensatioTabacco/CreateCompensationTabacco",
  async (option: deleteCompensationTabacco, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/compensationTabacco?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedCompensationTabacco(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const CompensationTabaccoSlice = createSlice({
  name: "compensationTabacco",
  initialState,
  reducers: {
    setCompensationTabacco: (
      state,
      action: PayloadAction<CompensationTabacco[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCompensationTabacco: (
      state,
      action: PayloadAction<CompensationTabacco>
    ) => {
      state.item = [...state.item, action.payload];
    },
    deletedCompensationTabacco: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setCompensationTabacco,
  setIsLoading,
  addCompensationTabacco,
  deletedCompensationTabacco,
} = CompensationTabaccoSlice.actions;
export default CompensationTabaccoSlice.reducer;
