import { ADD_PRODUCT_CART } from './actionTypes';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT_CART,
    product,
  };
}
