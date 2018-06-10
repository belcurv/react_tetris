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

  // set of all possible rotations
  // static methods are accessible by the class; not by instances
  static rotations() {
    return ['N', 'E', 'S', 'W'];
  }

  maxRow() {
    let pointRows = this.points().map(point => point.row);
    return Math.max(...pointRows);
  }
}
