import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './modules/rootReducers';
import rootSagas from './modules/rootSagas';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const Store = createStore(rootReducers, enhancer);

sagaMiddleware.run(rootSagas);

export default Store;
