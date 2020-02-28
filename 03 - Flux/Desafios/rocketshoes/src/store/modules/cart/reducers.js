import { produce } from 'immer';
import { ADD_PRODUCT_CART } from './actionTypes';

export default function cart(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    default:
      return state;
  }
}
