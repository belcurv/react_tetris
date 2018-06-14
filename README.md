# react_tetris
Tetris clone using react (hopefully)

The basic application flow:

### Model

_todo_

### Components

There are only 4; all are stateless functional components:

1. `GameView` - renders the whole game. Destructures `cols` and `rows` (the game board dimensions), `fallingPiece`, and `rubble` from the state objects's `game` property:

    ```jsx
    const GameView = ({ game : { cols, rows, fallingPiece, rubble }}) => (
      <div className='game-board' style={{ width : cols * 25, height : rows * 25 }}>
        <PieceView piece={ fallingPiece } />
        <RubbleView rubble={ rubble } />
      </div>
    );
    ```

2. `PieceView` - renders a falling `piece` (object) in a `<div>`. Each Piece consists of four `<Square>`s, defined by an array of 4 points.

    ```
    const PieceView = ({ piece }) => (
      <div>
        { piece.points().map((sq, idx) => (
          <Square key={`square${idx}`} row={sq.row} col={sq.col} />
        ))}
      </div>
    );
    ```

3. `RubbleView` - renders a `<span>` containing one `<Square>` for each element in the state's `rubble` array. Each element's `row` and `col` properties are passed to `<Square>` for positioning.

    ```
    const RubbleView = ({ rubble }) => (
      <span>
        { rubble.map((sq, idx) => (
          <Square key={`rubble${idx}`} row={sq.row} col={sq.col} />
        ))}
      </span>
    );
    ```

4. `Square` - renders a `<div>` with CSS class `square` at a specific position (`{col, row}`) on the game board using inline styles:

    ```
    <div className='square' style={{
        left : `${(col - 1) * 25}px`,
        top  : `${(row - 1) * 25}px`
      }} >
    </div>
    ```

