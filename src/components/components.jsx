import React from 'react';
import PropTypes from 'prop-types';

/* ================================= SETUP ================================= */

let count = 0;

/* ============================== COMPONENTS =============================== */

/**
 * Component responsible for rendering a single point.
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

export const ShapeView = ({ shape }) => (
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

/**
 * The game is rendered as a div with 25 pixels for each row and column.
 * Within the GameView there is a PieceView, which renders the current
 * (falling) piece, and a RubbleView which renders the rubble of all pieces
 * that have fallen previously.
*/
export const GameView = ({ game : { cols, rows, fallingPiece, rubble }}) => (
  <div className="border" style={{ width : cols * 25, height : rows * 25 }}>
    <PieceView piece={ fallingPiece } />
    <RubbleView rubble={ rubble } />
  </div>
);

GameView.propTypes = {
  game: PropTypes.object
};


/**
 * PieceView has a single prop `piece`, an instance of the Piece model type.
 * PieceView extracts the points from the piece and converts each one to a
 * Square.
*/
export const PieceView = ({ piece }) => (
  <div>
    { piece.points().map(sq => (
      <Square key={count++} row={sq.row} col={sq.col} />
    ))}
  </div>
);

PieceView.propTypes = {
  piece: PropTypes.object
};


/**
 * Rubbleview takes a single prop `rubble`, an array on the Game instance.
 * Rubbleview extracts the points from the rubble array and converts each one
 * to a Square.
*/
export const RubbleView = ({ rubble }) => (
  <span>
    { rubble.map(sq => <Square key={count++} row={sq.row} col={sq.col} />)}
  </span>
);

RubbleView.propTypes = {
  rubble: PropTypes.array
};
