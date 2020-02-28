import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { ADD_PRODUCT_REQUEST } from './actionTypes';
import { addProductSuccess } from './actions';

// * => Como se tivesse usando o async/await.
function* addToCart({ id }) {
  console.log(id);
  const response = yield call(api.get, `/products/${id}`);

  yield put(addProductSuccess(response.data));
}

export default all([takeLatest(ADD_PRODUCT_REQUEST, addToCart)]);
