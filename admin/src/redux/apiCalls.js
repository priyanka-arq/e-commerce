import { publicRequest, userRequest } from "../networkRequest";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";
import {
  networkRequest,
  networkRequestFailed,
  getCustomersSuccess,
  deleteCustomerSuccess,
  updateCustomerSuccess,
  addUserSuccess,
} from "./customerRedux";

import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";

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

export const getUsers = async (dispatch) => {
  dispatch(networkRequest());
  try {
    const res = await userRequest.get("users");
    dispatch(getCustomersSuccess(res.data));
  } catch (err) {
    dispatch(networkRequestFailed());
  }
};

export const deleteUser = async (id, dispatch) => {
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteCustomerSuccess(id));
  } catch {
    dispatch(networkRequestFailed());
  }
};

export const updateUser = async (id, customer, dispatch) => {
  const res = await userRequest.put(`users/${id}`, customer);
  dispatch(updateCustomerSuccess(id, res.data));
};

export const addUser = async (customer, dispatch) => {
  debugger;
  const res = await userRequest.post(`users`, customer);
  dispatch(addUserSuccess(res.data));
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // UPDATE
    const res = await userRequest.put(`products/${id}`, product);
    dispatch(updateProductSuccess(id, res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
