import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    networkRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    networkRequestFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCustomersSuccess: (state, action) => {
      state.isFetching = false;
      state.customers = action.payload;
    },
    //DELETE USER
    deleteCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.splice(
        state.customers.findIndex((user) => user._id === action.payload),
        1
      );
      //state.customers.filter((customer) => customer._id !== action.payload);
    },
    //UPDATE
    updateCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers[
        state.customers.findIndex(
          (customer) => customer._id === action.payload.id
        )
      ] = action.payload.customer;
    },
    //CREATE USER
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.push(action.payload);
    },
  },
});

export const {
  networkRequest,
  networkRequestFailed,
  getCustomersSuccess,
  deleteCustomerSuccess,
  updateCustomerSuccess,
  addUserSuccess,
} = customerSlice.actions;
export default customerSlice.reducer;
