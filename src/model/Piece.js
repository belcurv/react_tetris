import Point from './Point';

/**
 * An instance of a tetronimo on the board.
 * Offset defaults to middle of the game board.
*/
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

  maxRow() {
    let pointRows = this.points().map(point => point.row);
    return Math.max(...pointRows);
  }

  maxCol() {
    let pointCols = this.points().map(point => point.col);
    return Math.max(...pointCols);
  }

  minCol() {
    let pointCols = this.points().map(point => point.col);
    return Math.min(...pointCols);
  }

  hasPoint(point) {
    return this.points()
      .filter(item => item.sameAs(point))
      .length > 0;
  }

  rotate() {
    let currentRotIndex = Piece.rotations().indexOf(this.rotation);
    this.rotation = Piece.rotations()[(currentRotIndex + 1) % 4];
  }

  unRotate() {
    let currentRotIndex = Piece.rotations().indexOf(this.rotation);
    this.rotation = Piece.rotations()[(currentRotIndex - 1) % 4];
  }

  fallOne() {
    this.offset = new Point(this.offset.row + 1, this.offset.col);
  }

  liftOne() {
    this.offset = new Point(this.offset.row - 1, this.offset.col);
  }

  left() {
    this.offset = new Point(this.offset.row, this.offset.col - 1);
  }

  right() {
    this.offset = new Point(this.offset.row, this.offset.col + 1);
  }

  // set of all possible rotations
  // static methods are accessible by the class; not by instances
  static rotations() {
    return ['N', 'E', 'S', 'W'];
  }

}
