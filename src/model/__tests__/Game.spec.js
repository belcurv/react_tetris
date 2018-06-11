/* ================================= SETUP ================================= */

import { Game, Point } from '../index';


/* ================================= TESTS ================================= */


describe('Game model', () => {
  
  describe('full rows', () => {

    describe('game with last row full', () => {

      let game;

      beforeEach(() => {
        game = new Game();
        game.rubble = [...Array(game.cols)]
          .map((el, i) => new Point(game.rows, i + 1));
      });

      it('should have one completed row', () => {
        expect(game.completedRows().length).toEqual(1);
      });

    });

  });

});
