import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_REQUEST } from './actionTypes';

export function addProductRequest(id) {
  return {
    type: ADD_PRODUCT_REQUEST,
    id,
  };
}

export function addProductSuccess(product) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    product,
  };
}
