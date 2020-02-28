import { createStore } from 'redux';

import rootReducers from './modules/rootReducers';

const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

export const Store = createStore(rootReducers, enhancer);
