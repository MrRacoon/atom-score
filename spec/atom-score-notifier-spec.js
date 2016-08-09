'use babel';

import {
  notify,
  success,
  info,
  warning,
  error,
  fatalError
} from '../lib/atom-score-notifier'

const ARBITRARY = 'deadbeef'

describe('The notification system', function () {

  beforeEach(function () {
    spyOn(atom.notifications, 'addSuccess')
    spyOn(atom.notifications, 'addInfo')
    spyOn(atom.notifications, 'addWarning')
    spyOn(atom.notifications, 'addError')
    spyOn(atom.notifications, 'addFatalError')
  });

  describe('the success notifications', function () {
    it('can be called with notify', function () {
      notify('addSuccess', ARBITRARY)
      expect(atom.notifications.addSuccess).toHaveBeenCalledWith(ARBITRARY)
    });
    it('can be called with success', function () {
      success(ARBITRARY)
      expect(atom.notifications.addSuccess).toHaveBeenCalledWith(ARBITRARY)
    });
  });

  describe('the info notifications', function () {
    it('can be called with notify', function () {
      notify('addInfo', ARBITRARY)
      expect(atom.notifications.addInfo).toHaveBeenCalledWith(ARBITRARY)
    });
    it('can be called with info', function () {
      info(ARBITRARY)
      expect(atom.notifications.addInfo).toHaveBeenCalledWith(ARBITRARY)
    });
  });

  describe('the warning notifications', function () {
    it('can be called with notify', function () {
      notify('addWarning', ARBITRARY)
      expect(atom.notifications.addWarning).toHaveBeenCalledWith(ARBITRARY)
    });
    it('can be called with warning', function () {
      warning(ARBITRARY)
      expect(atom.notifications.addWarning).toHaveBeenCalledWith(ARBITRARY)
    });
  });

  describe('the error notifications', function () {
    it('can be called with notify', function () {
      notify('addError', ARBITRARY)
      expect(atom.notifications.addError).toHaveBeenCalledWith(ARBITRARY)
    });
    it('can be called with error', function () {
      error(ARBITRARY)
      expect(atom.notifications.addError).toHaveBeenCalledWith(ARBITRARY)
    });
  });

  describe('the fatalError notifications', function () {
    it('can be called with fatalError', function () {
      notify('addFatalError', ARBITRARY)
      expect(atom.notifications.addFatalError).toHaveBeenCalledWith(ARBITRARY)
    });
    it('can be called with error', function () {
      fatalError(ARBITRARY)
      expect(atom.notifications.addFatalError).toHaveBeenCalledWith(ARBITRARY)
    });
  });

});
