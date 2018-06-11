import React      from 'react';
import PropTypes  from 'prop-types';
import PieceView  from './PieceView.jsx';
import RubbleView from './RubbleView.jsx';

/**
 * The game is rendered as a div with 25 pixels for each row and column.
 * Within the GameView there is a PieceView, which renders the current
 * (falling) piece, and a RubbleView which renders the rubble of all pieces
 * that have fallen previously.
*/
const GameView = ({ game : { cols, rows, fallingPiece, rubble }}) => (
  <div className='game-board' style={{ width : cols * 25, height : rows * 25 }}>
    <PieceView piece={ fallingPiece } />
    <RubbleView rubble={ rubble } />
  </div>
);

GameView.propTypes = {
  game: PropTypes.object
};

export default GameView;
