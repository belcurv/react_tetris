import Piece from './Piece';
import shapes from './shapes';

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
    this.fallingPiece.offset = this.fallingPiece.offset.fallOne();
    if (this.fallingPiece.maxRow() >= this.rows) {
      this.convertToRubble();
    }
    return this;
  }

  convertToRubble() {
    this.rubble = this.rubble.concat(this.fallingPiece.points());
    this.startAPiece();
  }

  rotate() {
    this.fallingPiece.rotate();
    return this;
  }
}