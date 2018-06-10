/**
 * a tetromino
*/
export default class Shape {
  constructor(name, rotator) {
    this.name    = name;
    this.rotator = rotator;
  }

  pointsRotated(rotation) {
    return this.rotator(rotation);
  }
}
