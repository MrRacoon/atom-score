'use babel';

import AtomScore from '../lib/atom-score';

var sut

describe('AtomScore', () => {
  let view
  beforeEach(function () {
    view = atom.views.getView(atom.workspace)
    sut = AtomScore.activate()
  });
  describe('when calling commands', function () {
    describe('such as atom-score:panel-show', function () {
      beforeEach(function () {
        spyOn(sut.panel, 'show')
        atom.commands.dispatch(view, 'atom-score:show-panel')
      });
      it('should call the panels show method', function () {
        expect(sut.panel.show).toHaveBeenCalled()
      });
    });
    describe('such as atom-score:panel-hide', function () {
      beforeEach(function () {
        spyOn(sut.panel, 'hide')
        atom.commands.dispatch(view, 'atom-score:hide-panel')
      });
      it('should call the panels hide method', function () {
        expect(sut.panel.hide).toHaveBeenCalled()
      });
    });

    describe('such as atom-score:reset', function () {
      beforeEach(function () {
        spyOn(sut.scoreboard, 'reset')
        spyOn(sut.panel, 'setScore')
        atom.commands.dispatch(view, 'atom-score:reset')
      });
      it('should call the scoreboards reset method', function () {
        expect(sut.scoreboard.reset).toHaveBeenCalled()
      });
      it('should call the panels setScore method with the reseted score', function () {
        expect(sut.panel.setScore).toHaveBeenCalled()
      });
    });
  });
});
