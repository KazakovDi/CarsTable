import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiInterface } from "../api";
import { CarProps, ModalProps } from "../interfaces/car";
export enum FetchStatus {
  UNDEFINED = "undefined",
  SUCCESS = "success",
  PENDING = "pending",
  REJECTED = "rejected",
}
interface State {
  data: CarProps[] | [];
  storage: CarProps[] | [];
  dataStatus: FetchStatus;
  pagination: {
    pages: number;
    start: number;
    end: number;
    currentPage: number;
  };
  currentCar: ModalProps;
}
const SaveCarsToLocalStorage = (cars: CarProps[]) => {
  window.localStorage.setItem("cars", JSON.stringify(cars));
};
export const fetchCars = createAsyncThunk<CarProps[]>(
  "cars/fetchCars",
  async () => {
    try {
      const { cars } = await apiInterface.cars.getCars();
      return cars;
    } catch (err: any) {
      console.log(err);
    }
  }
);
const initialState: State = {
  data: [],
  dataStatus: FetchStatus.UNDEFINED,
  storage: [],
  pagination: {
    currentPage: 1,
    pages: 0,
    start: 0,
    end: 30,
  },
  currentCar: {
    id: null,
    car: "",
    car_model: "",
    car_color: "",
    car_model_year: "",
    car_vin: "",
    price: "",
    availability: false,
    mode: "",
  },
};
const carsSlice = createSlice({
  initialState,
  name: "cars",
  reducers: {
    getDataFromStorage(state, action: PayloadAction<CarProps[]>) {
      state.pagination.pages = Math.ceil(action.payload.length / 30);
      state.storage = action.payload;
      state.data = action.payload.slice(
        state.pagination.start,
        state.pagination.end
      );
    },
    setModal(state, action: PayloadAction<ModalProps>) {
      state.currentCar = action.payload;
    },
    colapseModal(state) {
      state.currentCar.id = null;
    },
    deleteItem(state, action: PayloadAction<number>) {
      let Index = 0;
      state.data = state.data.filter((item, index) => {
        if (item.id !== action.payload) {
          return true;
        } else {
          Index = index;
        }
      });
      const target = Index + state.pagination.start;
      state.storage.splice(target, 1);
      SaveCarsToLocalStorage(state.storage);
    },
    addItem(state, action: PayloadAction<CarProps>) {
      // В ТЗ не було вказано куди саме слід додавати новий запис,
      // тому зробив на свій розсуд - додавати новий запис в залежності від сторінки
      const newItem = {
        ...action.payload,
        availability:
          action.payload.availability == "true" ||
          action.payload.availability === true
            ? true
            : false,
      };
      const target = state.pagination.start;
      state.data.pop();
      state.data = [newItem, ...state.data];
      state.storage = [
        ...state.storage.slice(0, target),
        newItem,
        ...state.storage.slice(target),
      ];
      SaveCarsToLocalStorage(state.storage);
    },
    editItem(state, action: PayloadAction<CarProps>) {
      let Index = 0;
      state.data = state.data.map((item, index) => {
        if (action.payload.id === item.id) {
          Index = index;
          return {
            ...action.payload,
            availability: action.payload.availability === "true" ? true : false,
          };
        } else {
          return item;
        }
      });
      const target = state.pagination.start + Index;
      state.storage[target] = action.payload;
      SaveCarsToLocalStorage(state.storage);
    },
    changePaginationEndPoints(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload + 1;
      state.pagination.start = 30 * action.payload;
      state.pagination.end = state.pagination.start + 30;
    },
    search(state, action: PayloadAction<string>) {
      const reg = new RegExp(action.payload, "i");
      const newData: CarProps[] = [];
      state.storage.forEach((item) => {
        for (let value of Object.values(item)) {
          const found = String(value).match(reg);
          if (found) {
            newData.push(item);
            return;
          }
        }
      });
      state.data = newData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => {
      state.dataStatus = FetchStatus.PENDING;
    });
    builder.addCase(fetchCars.rejected, (state) => {
      state.dataStatus = FetchStatus.REJECTED;
    });
    builder.addCase(
      fetchCars.fulfilled,
      (state, action: PayloadAction<CarProps[]>) => {
        state.pagination.pages = Math.ceil(action.payload.length / 30);
        state.storage = action.payload;
        state.data = action.payload.slice(
          state.pagination.start,
          state.pagination.end
        );
        state.dataStatus = FetchStatus.SUCCESS;
      }
    );
  },
});

export const carsReducer = carsSlice.reducer;
export const {
  setModal,
  colapseModal,
  changePaginationEndPoints,
  deleteItem,
  getDataFromStorage,
  addItem,
  editItem,
  search,
} = carsSlice.actions;
