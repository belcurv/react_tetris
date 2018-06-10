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

  fallOne() {
    return new Point(this.row + 1, this.col);
  }

}
