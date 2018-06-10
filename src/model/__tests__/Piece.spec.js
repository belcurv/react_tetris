/* ================================= SETUP ================================= */

import { Piece, Point } from '../index';
import shapes from '../shapes';


/* ================================= TESTS ================================= */

describe('Piece model', () => {

  let piece;

  describe('.hasPoint()', () => {

    beforeAll(() => {
      piece = new Piece(shapes.I, new Point(1,1));
    });

    it('should have (1,1)', () => {
      expect(piece.hasPoint(new Point(1,1))).toBeTruthy();
    });

    it('should have (2,1)', () => {
      expect(piece.hasPoint(new Point(2,1))).toBeTruthy();
    });

    it('should have (3,1)', () => {
      expect(piece.hasPoint(new Point(3,1))).toBeTruthy();
    });

    it('should have (4,1)', () => {
      expect(piece.hasPoint(new Point(4,1))).toBeTruthy();
    });

    it('should not have (2,2)', () => {
      expect(piece.hasPoint(new Point(2,2))).toBeFalsy();
    });

    it('should not have (1,2)', () => {
      expect(piece.hasPoint(new Point(1,2))).toBeFalsy();
    });

    it('should not have (3,2)', () => {
      expect(piece.hasPoint(new Point(3,2))).toBeFalsy();
    });

    it('should not have (3,3)', () => {
      expect(piece.hasPoint(new Point(3,3))).toBeFalsy();
    });

  });

  describe('.rotate()', () => {

    describe('general rotation', () => {

      beforeAll(() => {
        piece = new Piece(shapes.I, new Point(1,1));
      });

      it('should rotate clockwise indefinitely', () => {
        expect(piece.rotation).toBe('N');
        piece.rotate();
        expect(piece.rotation).toBe('E');
        piece.rotate();
        expect(piece.rotation).toBe('S');
        piece.rotate();
        expect(piece.rotation).toBe('W');
        piece.rotate();
        expect(piece.rotation).toBe('N');
      });

    });

    describe('rotating an I', () => {

      beforeAll(() => {
        piece = new Piece(shapes.I, new Point(1,1));
      });

      it('should have the expected points to start with', () => {
        expect(piece.points()).toEqual([
          new Point(1,1), new Point(2,1), new Point(3,1), new Point(4,1)
        ]);
      });

      it('should have correct points when rotated to E position', () => {
        piece.rotate();
        expect(piece.points()).toEqual([
          new Point(2,1), new Point(2,2), new Point(2,3), new Point(2,4)
        ]);
      });

      it('should have correct points when rotated to S position', () => {
        piece.rotate();
        expect(piece.points()).toEqual([
          new Point(1,1), new Point(2,1), new Point(3,1), new Point(4,1)
        ]);
      });

      it('should have correct points when rotated to W position', () => {
        piece.rotate();
        expect(piece.points()).toEqual([
          new Point(2,1), new Point(2,2), new Point(2,3), new Point(2,4)
        ]);
      });

      it('should have correct points when rotated back to N position', () => {
        piece.rotate();
        expect(piece.points()).toEqual([
          new Point(1,1), new Point(2,1), new Point(3,1), new Point(4,1)
        ]);
      });
  
    });

  });

});
