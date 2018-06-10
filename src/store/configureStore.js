/* ================================= SETUP ================================= */

import { createStore } from 'redux';
import tetrisReducer from '../reducers/tetris';

/* ================================= STORE ================================= */

export default () => {
  const store = createStore(tetrisReducer);
  return store;
};
