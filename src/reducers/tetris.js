/**
 * WTF is the author doing.
 * 
 * State should look like this:
 * cols: 10
 * rows: 20
 * fallingPiece: {
 *   offset: { row: Number, col: Number},
 *   rotation: String
 *   shape: { name: "String", rotator: function }
 * }
 * rubble: [ { row: Number, col: Number } ]
*/

/* ================================= SETUP ================================= */

import * as Model from '../model';
const defaultState = new Model.Game();


/* ================================= STORE ================================= */

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'TICK':
      return state.tick();

    case 'ROTATE':
      return state.rotate();

    case 'LEFT':
      return state.left();

    case 'RIGHT':
      return state.right();

    default:
      return state;

  }
};
