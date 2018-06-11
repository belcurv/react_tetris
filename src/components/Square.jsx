import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component responsible for rendering a single point.
 * Props `col` and `row` are integers, and are converted to px dimensions.
*/
const Square = ({col, row}) => (
  <div className='square' style={{
    left : `${(col - 1) * 25}px`,
    top  : `${(row - 1) * 25}px`
  }} >
  </div>
);

Square.propTypes = {
  col: PropTypes.number,
  row: PropTypes.number,
};

export default Square;
