export class Point {
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

export class Sqr {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

// a tetromino
export class Shape {
  constructor(name, rotator) {
    this.name    = name;
    this.rotator = rotator;
  }

  pointsRotated(rotation) {
    return this.rotator(rotation);
  }
}

// An instance of a tetronimo on the board.
// Offset defaults to middle of the game board.
export class Piece {
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

// the Game. Tracks currently falling piece and the 'rubble' left by all the
// pieces that have previously fallen. Game converts fallen pieces to rubble,
// which is just a collection of points.
export class Game {
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

// dictionary of shae types to squares
export const shapes = {

  O: new Shape('O', () => {
    return [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(2, 2)];
  }),    

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

  T: new Shape('T', (rotation) => {
    switch (rotation) {
      case 'N':
        return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)];
      case 'S':
        return [new Point(1,2), new Point(2,1), new Point(2,2), new Point(2,3)];
      case 'E':
        return [new Point(1,2), new Point(2,2), new Point(3,2), new Point(2,1)];
      case 'W':
        return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(2,2)];
    }
  }),

  L: new Shape('L', (rotation) => {
    switch (rotation) {
      case 'N':
        return [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)];
      case 'S':
        return [new Point(1,3), new Point(2,1), new Point(2,2), new Point(3,2)];
      case 'E':
        return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(3,2)];
      case 'W':
        return [new Point(1,1), new Point(2,1), new Point(3,3), new Point(3,2)];
    }
  }),

  Z: new Shape('Z', (rotation) => {
    switch (rotation) {
      case 'N':
        return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)];
      case 'S':
        return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)];
      case 'E':
        return [new Point(1,2), new Point(2,2), new Point(2,1), new Point(3,1)];
      case 'W':
        return [new Point(1,2), new Point(2,2), new Point(2,1), new Point(3,1)];
    }
  }),

  selectRandom: function() {
    let index = Math.floor(Math.random() * 100000 % 5);
    return shapes[['O', 'I', 'T', 'L', 'Z'][index]];
  }

};


export class O {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  squares() {
    return [
      new Sqr(this.row, this.col),
      new Sqr(this.row, this.col + 1),
      new Sqr(this.row + 1, this.col),
      new Sqr(this.row + 1, this.col + 1),
    ];
  }
}

export class I {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  squares() {
    return [
      new Sqr(this.row, this.col),
      new Sqr(this.row + 1, this.col),
      new Sqr(this.row + 2, this.col),
      new Sqr(this.row + 3, this.col),
    ];
  }
}