import {
  addMainClosing,
  deleteMainClosing,
  mainClosingTypeSlice,
  updateMainClosing,
} from "@/types/mainClosingType";
import Config from "@/utils/config";
import { ClosingMainBalance, DailyExpensive } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: mainClosingTypeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddMainClosing = createAsyncThunk(
  "mainClosing/AddMainClosing",
  async (option: addMainClosing, thunkApi) => {
    const { date, amount, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/mainClosing?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount }),
        }
      );
      const { addMainClosing } = await response.json();
      thunkApi.dispatch(addedMainClosing(addMainClosing));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

// export const UpdatedMainClosing = createAsyncThunk(
//   "mainClosing/UpdatedMainClosing",
//   async (option: updateMainClosing, thunkApi) => {
//     const { amount, id, date, onSuccess, onError } = option;
//     const workShopId = localStorage.getItem("selectedWorkShopId");
//     try {
//       const response = await fetch(
//         `${Config.apiBaseUrl}/mainClosing?workShopId=${workShopId}`,
//         {
//           method: "PUT",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({ date, amount, id }),
//         }
//       );
//       const { updateMainClosing } = await response.json();
//       thunkApi.dispatch(updatedMainClosing(updateMainClosing));
//       onSuccess && onSuccess();
//     } catch (err) {
//       onError && onError();
//     }
//   }
// );

// export const DeletedMainClosing = createAsyncThunk(
//   "mainClosing/DeletedMainClosing",
//   async (option: deleteMainClosing, thunkApi) => {
//     const { id, onSuccess, onError } = option;
//     try {
//       const response = await fetch(
//         `${Config.apiBaseUrl}/mainClosing?id=${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       thunkApi.dispatch(deletedMainClosing(id));
//       onSuccess && onSuccess();
//     } catch (err) {
//       onError && onError();
//     }
//   }
// );

const MainClosingSlice = createSlice({
  name: "mainClosing",
  initialState,
  reducers: {
    setMainClosing: (state, action: PayloadAction<ClosingMainBalance[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedMainClosing: (state, action: PayloadAction<ClosingMainBalance>) => {
      state.item = [...state.item, action.payload];
    },
    updatedMainClosing: (state, action: PayloadAction<ClosingMainBalance>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedMainClosing: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setMainClosing,
  setIsLoading,
  addedMainClosing,
  updatedMainClosing,
  deletedMainClosing,
} = MainClosingSlice.actions;
export default MainClosingSlice.reducer;
