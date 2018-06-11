import React     from 'react';
import PropTypes from 'prop-types';
import Square    from './Square';

/**
 * PieceView has a single prop `piece`, an instance of the Piece model type.
 * PieceView extracts the points from the piece and converts each one to a
 * Square.
*/
const PieceView = ({ piece }) => (
  <div>
    { piece.points().map((sq, idx) => (
      <Square key={`square${idx}`} row={sq.row} col={sq.col} />
    ))}
  </div>
);

PieceView.propTypes = {
  piece: PropTypes.object
};

export default PieceView;
