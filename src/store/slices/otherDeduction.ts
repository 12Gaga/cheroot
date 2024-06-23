import {
  createNewOtherDeduction,
  deleteOtherDeduction,
  otherDeductionSlice,
} from "@/types/otherDeductionType";
import Config from "@/utils/config";
import { OtherDeduction } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAgentRemainCash, deletedAgentRemainCash } from "./agentRemainCash";
import { addReturnCheroot, deletedReturnCheroot } from "./returnCheroot";
import { addLeafDeduction, deletedLeafDeduction } from "./leafDeduction";
import { deleteExtraPurchseSummary } from "./extraPurchaseSummery";
import { deletedAgentRemainLeaf } from "./agentRemainLeaf";

const initialState: otherDeductionSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateOtherDeduction = createAsyncThunk(
  "otherDeduction/CreateOtherDeduction",
  async (option: createNewOtherDeduction, thunkApi) => {
    const {
      cheroots,
      leaf,
      date,
      agentId,
      cashAdvanceBigDeduction,
      cashAdvanceSmallDeduction,
      otherDeduction,
      cashAdvanceBig,
      cashAdvanceSmall,
      netAgentPayment,
      bonusPayment,
      totalNetAgentPayment,
      purchaseSeq,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/otherDeduction?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            cheroots,
            leaf,
            date,
            agentId,
            cashAdvanceBigDeduction,
            cashAdvanceSmallDeduction,
            otherDeduction,
            cashAdvanceBig,
            cashAdvanceSmall,
            netAgentPayment,
            bonusPayment,
            totalNetAgentPayment,
            purchaseSeq,
          }),
        }
      );
      const {
        newOtherDeduction,
        newRemainCash,
        newReturnCheroot,
        newLeafDeduction,
        seq,
      } = await response.json();
      thunkApi.dispatch(addOtherDeduction(newOtherDeduction));
      thunkApi.dispatch(addAgentRemainCash(newRemainCash));
      thunkApi.dispatch(addReturnCheroot(newReturnCheroot));
      thunkApi.dispatch(addLeafDeduction(newLeafDeduction));
      thunkApi.dispatch(deleteExtraPurchseSummary(purchaseSeq));
      onSuccess && onSuccess(seq);
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedReturnCheroot = createAsyncThunk(
  "otherDeduction/DeletedReturnCheroot",
  async (option: deleteOtherDeduction, thunkApi) => {
    const { seq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/otherDeduction?seq=${seq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedOtherDeduction(seq));
      thunkApi.dispatch(deletedLeafDeduction(seq));
      thunkApi.dispatch(deletedReturnCheroot(seq));
      thunkApi.dispatch(deletedAgentRemainCash(seq));
      thunkApi.dispatch(deletedAgentRemainLeaf(seq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const OtherDeductionSlice = createSlice({
  name: "otherDeduction",
  initialState,
  reducers: {
    setOtherDeduction: (state, action: PayloadAction<OtherDeduction[]>) => {
      state.item = action.payload;
    },
    setLoadingOtherDeduction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addOtherDeduction: (state, action: PayloadAction<OtherDeduction>) => {
      state.item = [...state.item, action.payload];
    },
    deletedOtherDeduction: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.seq != action.payload);
    },
  },
});

export const {
  setOtherDeduction,
  setLoadingOtherDeduction,
  addOtherDeduction,
  deletedOtherDeduction,
} = OtherDeductionSlice.actions;
export default OtherDeductionSlice.reducer;
