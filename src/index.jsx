import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GameView } from './components/components';
import configureStore from './store/configureStore';

import './styles/style.css';

const appRoot = document.getElementById('app');
const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  ReactDOM.render(
    <GameView game={ state } />,
    appRoot
  );
});

setInterval(() => store.dispatch({ type: 'TICK' }), 1000);