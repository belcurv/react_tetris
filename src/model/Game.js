import Piece from './Piece';
import shapes from './shapes';
import Point from './Point';

/**
 * the Game. Tracks currently falling piece and the 'rubble' left by all the
 * pieces that have previously fallen. Game converts fallen pieces to rubble,
 * which is just a collection of points.
*/
export default class Game {
  constructor() {
    this.rows = 20;
    this.cols = 10;
    this.rubble = [];
    this.startAPiece();
  }

  startAPiece() {
    this.fallingPiece = new Piece(shapes.selectRandom());
  }

  tick() {
    this.attempt(
      () => this.fallingPiece.fallOne(),
      () => this.fallingPiece.liftOne()
    );
    if (this.fallingPiece.maxRow() >= this.rows) {
      this.convertToRubble();
      return this;
    }
    let nextPos = this.fallingPiece.points().map(p => new Point(p.row + 1, p.col));
    if (nextPos.some(p => this.rubble.some(r => r.sameAs(p)))) {
      this.convertToRubble();
    }
    return this;
  }

  /**
   * finds all the rows for which every column contains rubble.
  */
  completedRows() {
    const rows = [...Array(this.rows)].map((e, i) => i + 1);
    console.log(rows);
  }

  convertToRubble() {
    this.rubble = this.rubble.concat(this.fallingPiece.points());
    this.startAPiece();
  }

  rotate() {
    this.attempt(
      () => this.fallingPiece.rotate(),
      () => this.fallingPiece.unRotate()
    );
    return this;
  }

  left() {
    this.attempt(
      () => this.fallingPiece.left(),
      () => this.fallingPiece.right()
    );
    return this;
  }

  right() {
    this.attempt(
      () => this.fallingPiece.right(),
      () => this.fallingPiece.left()
    );
    return this;
  }

  fallingPieceOutOfBounds() {
    return this.fallingPiece.minCol() < 1
      || this.fallingPiece.maxCol() > this.cols
      || this.fallingPiece.maxRow() > this.rows;
  }

  fallingPieceOverlapsRubble() {
    return this.fallingPiece.points().some(p => this.rubble.some(r => r.sameAs(p)));
  }

  attempt(action, revertAction) {
    action();
    if (this.fallingPieceOutOfBounds() || this.fallingPieceOverlapsRubble()) {
      revertAction();
    }
  }

}