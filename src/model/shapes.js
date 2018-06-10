import Point from './Point';
import Shape from './Shape';

/**
 * dictionary of shape types to squares, plus method to pick a shape at
 * random
*/
const shapes = {

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

export default shapes;
