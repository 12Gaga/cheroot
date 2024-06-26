import {
  createNewWorkShop,
  deleteWorkshop,
  updateWorkShop,
  workShopSlice,
} from "@/types/workShopType";
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

export const UpdatedWorkShop = createAsyncThunk(
  "workShop/UpdateWorkShop",
  async (option: updateWorkShop, thunkApi) => {
    const { name, id, onSuccess, onError } = option;

    try {
      const response = await fetch(`${Config.apiBaseUrl}/workShop`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, id }),
      });
      const { updateWorkShop } = await response.json();
      thunkApi.dispatch(updatedWorkShop(updateWorkShop));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedWorkShop = createAsyncThunk(
  "workShop/DeletedWorkShop",
  async (option: deleteWorkshop, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/workShop?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedWorkShop(id));
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
    updatedWorkShop: (state, action: PayloadAction<WorkShop>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedWorkShop: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setWorkShop,
  setSelectedWorkShop,
  setIsLoading,
  addWorkShop,
  updatedWorkShop,
  deletedWorkShop,
} = WorkShopSlice.actions;
export default WorkShopSlice.reducer;
