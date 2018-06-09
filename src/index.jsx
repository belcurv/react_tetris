import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Components from './components/components';
import * as Model from './models/models';

import './styles/style.css';

const data = [
  new Model.O(1, 1),
  new Model.I(1, 4)
];


ReactDOM.render(
  <div>
    { data.map((c, i) => <Components.ShapeView key={ i } shape={ c } />)}
  </div>,
  document.getElementById('app')
);