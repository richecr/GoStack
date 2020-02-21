import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmount } from './actions';

// * => Como se tivesse usando o async/await.
function* addToCart({ id }) {
  const productExists = yield select(state => {
    return state.cart.find(p => p.id === id);
  });

  if (productExists) {
    const amount = productExists.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
