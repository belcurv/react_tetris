import React     from 'react';
import PropTypes from 'prop-types';
import Square    from './Square';


/**
 * Rubbleview takes a single prop `rubble`, an array on the Game instance.
 * Rubbleview extracts the points from the rubble array and converts each one
 * to a Square.
*/
const RubbleView = ({ rubble }) => (
  <span>
    { rubble.map((sq, idx) => (
      <Square key={`rubble${idx}`} row={sq.row} col={sq.col} />
    ))}
  </span>
);

RubbleView.propTypes = {
  rubble: PropTypes.array
};

export default RubbleView;
