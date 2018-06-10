/* ================================= SETUP ================================= */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Mousetrap from 'mousetrap';

import { GameView } from './components/components';
import configureStore from './store/configureStore';

import './styles/style.css';

const appRoot = document.getElementById('app');


/* ============================= CONFIG STORE ============================== */

const store = configureStore();


/* ============================== BIND EVENTS ============================== */

Mousetrap.bind('space', () => store.dispatch({ type: 'ROTATE' }));
Mousetrap.bind('left',  () => store.dispatch({ type: 'LEFT' }));
Mousetrap.bind('right', () => store.dispatch({ type: 'RIGHT' }));


/* ================================ STARTUP ================================ */

store.subscribe(() => {
  const state = store.getState();
  // console.log(state.rubble);
  ReactDOM.render(
    <GameView game={ state } />,
    appRoot
  );
});

setInterval(() => store.dispatch({ type: 'TICK' }), 500);
