import {
  addDailyClosing,
  dailyClosingTypeSlice,
  deleteDailyClosing,
  updateDailyClosing,
} from "@/types/dailyClosingType";
import Config from "@/utils/config";
import { ClosingDailyBalance } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: dailyClosingTypeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddDailyClosing = createAsyncThunk(
  "dailyClosing/AddDailyClosing",
  async (option: addDailyClosing, thunkApi) => {
    const { date, amount, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/dailyClosing?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount }),
        }
      );
      const { addDailyClosing } = await response.json();
      thunkApi.dispatch(addedDailyClosing(addDailyClosing));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

// export const UpdatedDailyClosing = createAsyncThunk(
//   "dailyClosing/UpdatedDailyClosing",
//   async (option: updateDailyClosing, thunkApi) => {
//     const { amount, id, date, onSuccess, onError } = option;
//     const workShopId = localStorage.getItem("selectedWorkShopId");
//     try {
//       const response = await fetch(
//         `${Config.apiBaseUrl}/dailyClosing?workShopId=${workShopId}`,
//         {
//           method: "PUT",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({ date, amount, id }),
//         }
//       );
//       const { updateDailyClosing } = await response.json();
//       thunkApi.dispatch(updatedDailyClosing(updateDailyClosing));
//       onSuccess && onSuccess();
//     } catch (err) {
//       onError && onError();
//     }
//   }
// );

// export const DeletedDailyClosing = createAsyncThunk(
//   "dailyClosing/DeletedDailyClosing",
//   async (option: deleteDailyClosing, thunkApi) => {
//     const { id, onSuccess, onError } = option;
//     try {
//       const response = await fetch(
//         `${Config.apiBaseUrl}/dailyClosing?id=${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       thunkApi.dispatch(deletedDailyClosing(id));
//       onSuccess && onSuccess();
//     } catch (err) {
//       onError && onError();
//     }
//   }
// );

const DailyClosingSlice = createSlice({
  name: "dailyClosing",
  initialState,
  reducers: {
    setDailyClosing: (state, action: PayloadAction<ClosingDailyBalance[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedDailyClosing: (state, action: PayloadAction<ClosingDailyBalance>) => {
      state.item = [...state.item, action.payload];
    },
    updatedDailyClosing: (
      state,
      action: PayloadAction<ClosingDailyBalance>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedDailyClosing: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setDailyClosing,
  setIsLoading,
  addedDailyClosing,
  updatedDailyClosing,
  deletedDailyClosing,
} = DailyClosingSlice.actions;
export default DailyClosingSlice.reducer;
