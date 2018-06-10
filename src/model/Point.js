/**
 * a single point
*/
export default class Point {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  addOffset(offset) {
    return new Point(this.row - 1 + offset.row, this.col - 1 + offset.col);
  }

  sameAs(p2) {
    return this.row === p2.row && this.col === p2.col;
  }

}
