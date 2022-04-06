// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "auth",
//   initialState: {
//     currentUser: null,
//     isFetching: false,
//     error: false,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.isFetching = true;
//     },
//     loginSuccess: (state, action) => {
//       state.isFetching = false;
//       state.currentUser = action.payload;
//     },
//     loginFailure: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },
//     logoutSuccess: (state) => {
//       state.currentUser = {};
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
//   userSlice.actions;
// export default userSlice.reducer;
