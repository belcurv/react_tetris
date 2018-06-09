import React from 'react';
import PropTypes from 'prop-types';

const Square = ({col, row}) => (
  <div
    className='square'
    style={{ left: `${(col - 1) * 25}px`, top : `${(row - 1) * 25}px` }} >
  </div>
);

Square.propTypes = {
  col: PropTypes.number,
  row: PropTypes.number,
};

const ShapeView = ({ shape }) => (
  <div>
    {
      shape.squares().map(({ row, col }, indx) => (
        <Square key={ indx } row={ row } col={ col } />
      ))
    }
  </div>
);

ShapeView.propTypes = {
  shape: PropTypes.object
};

export { ShapeView };
