# react_tetris

Adapted from: https://withouttheloop.com/articles/2015-12-22-tetris1/

### High-Level Event Loop

A new `redux` store is initialized on page load:

* The initial state is an new instance of the `Game` model (an ES6 `class`).
* `Game`'s constructor
    1. sets the game board's dimensions (`rows`, `cols`),
    2. initializes an empty `rubble` array, and
    3. calls its own `startAPiece()` method to start the first falling tetromino.

The [Mousetrap](https://craig.is/killing/mice) library is used to bind keyboard events:

* Event handler callbacks dispatch redux actions `ROTATE`, `LEFT`, and `RIGHT`.
* In the reducer, those actions trigger calls to corresponding methods on the state object (an instance of the `Game` class):
    1. `rotate()`
    2. `left()`
    3. `right()`
* Each of those methods calls `.attempt()`, a sort of try-catch class method that accepts two functions as its arguments. `.attempt()`:
    1) calls function 1
    2) checks to make sure the game piece's state is still valid (not out of bounds, etc), and
    3) if it **is** invalid, calls function 2 to "undo" function 1.

A root-level `setInterval()` dispatches a `TICK` action every 500ms. This advances the game state:

* In the reducer, those `TICK` actions trigger calls to a `tick()` method on the state object.
* `tick()` attempts to "fall" the current tetromino piece by one square and
* converts it to `rubble` if certain conditions are met.

### Model

Game class method `.startAPiece()` calls `new Piece(shapes.selectRandom());`

`shapes` is an object consisting of five properties (one for each shape: `O`, `I`, `T`, `L`, `Z`) plus a method, `.selectRandom()` to pick one of those shapes at random.

Each of `shape`'s properties instantiates a new `Shape`, passing the shape's name and an anonymous "rotator" function to the `Shape` constructor. The purpose of the rotator function is to return an array of `Point` objects based on a passed cardinal direction (N, S, E, W). For example, the `I` property looks like this:

```js
I: new Shape('I', (rotation) => {
    switch (rotation) {
      case 'N':
        return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(4,1)];
      case 'S':
        return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(4,1)];
      case 'E':
        return [new Point(2,1), new Point(2,2), new Point(2,3), new Point(2,4)];
      case 'W':
        return [new Point(2,1), new Point(2,2), new Point(2,3), new Point(2,4)];
    }
}),
```

Each instance of the `Shape` class has two properties - `name` (`O`, `I`, `T`, `L`, or `Z`) and `rotator` (the anonymous function from above), plus a method `.pointsRotated(rotation)` that calls the `rotator` function with one of the four cardinal directions, returning the correct array of points to render.

```js
export default class Shape {
  constructor(name, rotator) {
    this.name    = name;
    this.rotator = rotator;
  }

  pointsRotated(rotation) {
    return this.rotator(rotation);
  }
}
```

Instances of the `Piece` class are created with properties `shape`, `offset` (defaulting to `Point(1, 5)` aka first row, middle column), and `rotation` (defaulting to 'N').  The class method `.points()` generates an array of rotated points and positions the piece by applying `this.offset` to each point in the piece's array of points.

```js
export default class Piece {
  constructor(shape, offset = new Point(1, 5)) {
    this.shape = shape;
    this.offset = offset;
    this.rotation = 'N';
  }

  // returns the points that need to be drawn for the piece
  points() {
    return this.shape.pointsRotated(this.rotation)
      .map((point) => point.addOffset(this.offset));
  }
  ...
}
```

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

    ```jsx
    const PieceView = ({ piece }) => (
      <div>
        { piece.points().map((sq, idx) => (
          <Square key={`square${idx}`} row={sq.row} col={sq.col} />
        ))}
      </div>
    );
    ```

3. `RubbleView` - renders a `<span>` containing one `<Square>` for each element in the state's `rubble` array. Each element's `row` and `col` properties are passed to `<Square>` for positioning.

    ```jsx
    const RubbleView = ({ rubble }) => (
      <span>
        { rubble.map((sq, idx) => (
          <Square key={`rubble${idx}`} row={sq.row} col={sq.col} />
        ))}
      </span>
    );
    ```

4. `Square` - renders a `<div>` with CSS class `square` at a specific position (`{col, row}`) on the game board using inline styles:

    ```jsx
    <div className='square' style={{
        left : `${(col - 1) * 25}px`,
        top  : `${(row - 1) * 25}px`
      }} >
    </div>
    ```

