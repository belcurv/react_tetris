import * as React     from 'react';
import * as ReactDOM  from 'react-dom';
import * as Mousetrap from 'mousetrap';

import GameView       from './components/GameView';
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
  ReactDOM.render( <GameView game={ store.getState() } />, appRoot );
});

setInterval(() => store.dispatch({ type: 'TICK' }), 500);
