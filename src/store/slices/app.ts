import { GetOption, appSlice } from "@/types/appType";
import Config from "@/utils/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setIndustry } from "./industry";
import { setWorkShop } from "./workShop";
import { setGarage } from "./garage";
import { setLeaf } from "./typeOfLeaf";
import { setFilterSize } from "./typeOfFilterSize";
import { setTabacco } from "./typeOfTabacco";
import { setLabel } from "./typeOfLabel";
import { setCheroot } from "./typeOfCheroot";
import { setTypeOfPacking } from "./typeOfPacking";
import { setFormOfPacking } from "./formOfPacking";
import { setConveyLocation } from "./conveyLocation";

const initialState: appSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchApp = createAsyncThunk(
  "app/fetchApp",
  async (payload: GetOption, thunkApi) => {
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/app`);
      const dataFromServer = await response.json();
      const {
        industry,
        workShop,
        garage,
        leaf,
        filterSize,
        tabacco,
        label,
        cheroot,
        typeOfPacking,
        formOfPacking,
        conveyLocation,
      } = dataFromServer;
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setIndustry(industry));
      thunkApi.dispatch(setWorkShop(workShop));
      thunkApi.dispatch(setGarage(garage));
      thunkApi.dispatch(setLeaf(leaf));
      thunkApi.dispatch(setFilterSize(filterSize));
      thunkApi.dispatch(setTabacco(tabacco));
      thunkApi.dispatch(setLabel(label));
      thunkApi.dispatch(setCheroot(cheroot));
      thunkApi.dispatch(setTypeOfPacking(typeOfPacking));
      thunkApi.dispatch(setFormOfPacking(formOfPacking));
      thunkApi.dispatch(setConveyLocation(conveyLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = AppSlice.actions;
export default AppSlice.reducer;
