import { createNewWorkShop, workShopSlice } from "@/types/workShopType";
import Config from "@/utils/config";
import { WorkShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: workShopSlice = {
  item: [],
  selectedWorkShop: null,
  isLoading: false,
  error: null,
};

export const CreateWorkShop = createAsyncThunk(
  "workShop/CreateWorkShop",
  async (option: createNewWorkShop, thunkApi) => {
    const { name, industryId, onSuccess, onError } = option;

    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/workShop?cigratteIndustryId=${industryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newWorkShop } = await response.json();
      thunkApi.dispatch(addWorkShop(newWorkShop));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const WorkShopSlice = createSlice({
  name: "workShop",
  initialState,
  reducers: {
    setWorkShop: (state, action: PayloadAction<WorkShop[]>) => {
      state.item = action.payload;
      const selectedId = localStorage.getItem("selectedWorkShopId");
      if (!selectedId) {
        const firstWorkShop = action.payload[0];
        state.selectedWorkShop = firstWorkShop;
        localStorage.setItem("selectedWorkShopId", String(firstWorkShop.id));
      } else {
        const workShop = state.item.find(
          (item) => item.id === Number(selectedId)
        );
        if (workShop) {
          state.selectedWorkShop = workShop;
        }
      }
    },
    setSelectedWorkShop: (state, action: PayloadAction<WorkShop>) => {
      state.selectedWorkShop = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addWorkShop: (state, action: PayloadAction<WorkShop>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setWorkShop, setSelectedWorkShop, setIsLoading, addWorkShop } =
  WorkShopSlice.actions;
export default WorkShopSlice.reducer;
