import { publicRequest } from "../networkRequest";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutSuccess());
};

//http://localhost:3000/api/auth/login
