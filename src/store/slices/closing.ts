import { addClosing, closing, closingSlice } from "@/types/closingType";
import Config from "@/utils/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addedMainClosing } from "./mainClosing";
import { addedDailyClosing } from "./dailyClosing";

const initialState: closingSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddClosing = createAsyncThunk(
  "closing/AddClosing",
  async (option: addClosing, thunkApi) => {
    const { date, dailyClosing, mainClosing, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/closing?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, dailyClosing, mainClosing }),
        }
      );
      const { dailyClosings, mainClosings } = await response.json();
      thunkApi.dispatch(addedMainClosing(mainClosings));
      thunkApi.dispatch(addedDailyClosing(dailyClosings));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const ClosingSlice = createSlice({
  name: "closing",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setIsLoading } = ClosingSlice.actions;
export default ClosingSlice.reducer;
