/* ================================= SETUP ================================= */

import * as Model from '../model/models';
const defaultState = new Model.Game();


/* ================================= STORE ================================= */

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'TICK':
      console.log('TICK!');
      return state.tick();

    default:
      return state;

  }
};
