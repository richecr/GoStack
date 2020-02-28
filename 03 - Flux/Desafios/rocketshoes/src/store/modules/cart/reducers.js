import { produce } from 'immer';
import { ADD_PRODUCT_SUCCESS } from './actionTypes';

export default function cart(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    default:
      return state;
  }
}
