'use babel'

import {
  notify,
  success,
  info,
  warning,
  error,
  fatalError
} from '../../lib/behavior/notify'

const ARBITRARY = 'deadbeef'

describe('The notification system', function () {
  beforeEach(function () {
    spyOn(atom.notifications, 'addSuccess')
    spyOn(atom.notifications, 'addInfo')
    spyOn(atom.notifications, 'addWarning')
    spyOn(atom.notifications, 'addError')
    spyOn(atom.notifications, 'addFatalError')
  })

  describe('The notify function', function () {
    describe('When given a type', function () {
      it('should return a function', function () {
        expect(typeof notify(ARBITRARY)).toEqual('function')
      })
      it('should not have made a notification', function () {
        expect(atom.notifications.addSuccess).not.toHaveBeenCalled()
        expect(atom.notifications.addInfo).not.toHaveBeenCalled()
        expect(atom.notifications.addWarning).not.toHaveBeenCalled()
        expect(atom.notifications.addError).not.toHaveBeenCalled()
        expect(atom.notifications.addFatalError).not.toHaveBeenCalled()
      })
    })
    describe('after supplying the type', function () {
      var n, typ, msg
      beforeEach(function () {
        typ = 'addSuccess'
        msg = ARBITRARY
        n   = notify(typ)
      })
      describe('when given a message', function () {
        beforeEach(function () {
          n(msg)
        })
        it('should have created the notification', function () {
          expect(atom.notifications[typ]).toHaveBeenCalledWith(msg)
        })
      })
    })
  })

  describe('the success notifications', function () {
    it('can be called with notify', function () {
      notify('addSuccess')(ARBITRARY)
      expect(atom.notifications.addSuccess).toHaveBeenCalledWith(ARBITRARY)
    })
    it('can be called with success', function () {
      success(ARBITRARY)
      expect(atom.notifications.addSuccess).toHaveBeenCalledWith(ARBITRARY)
    })
  })

  describe('the info notifications', function () {
    it('can be called with notify', function () {
      notify('addInfo')(ARBITRARY)
      expect(atom.notifications.addInfo).toHaveBeenCalledWith(ARBITRARY)
    })
    it('can be called with info', function () {
      info(ARBITRARY)
      expect(atom.notifications.addInfo).toHaveBeenCalledWith(ARBITRARY)
    })
  })

  describe('the warning notifications', function () {
    it('can be called with notify', function () {
      notify('addWarning')(ARBITRARY)
      expect(atom.notifications.addWarning).toHaveBeenCalledWith(ARBITRARY)
    })
    it('can be called with warning', function () {
      warning(ARBITRARY)
      expect(atom.notifications.addWarning).toHaveBeenCalledWith(ARBITRARY)
    })
  })

  describe('the error notifications', function () {
    it('can be called with notify', function () {
      notify('addError')(ARBITRARY)
      expect(atom.notifications.addError).toHaveBeenCalledWith(ARBITRARY)
    })
    it('can be called with error', function () {
      error(ARBITRARY)
      expect(atom.notifications.addError).toHaveBeenCalledWith(ARBITRARY)
    })
  })

  describe('the fatalError notifications', function () {
    it('can be called with fatalError', function () {
      notify('addFatalError')(ARBITRARY)
      expect(atom.notifications.addFatalError).toHaveBeenCalledWith(ARBITRARY)
    })
    it('can be called with error', function () {
      fatalError(ARBITRARY)
      expect(atom.notifications.addFatalError).toHaveBeenCalledWith(ARBITRARY)
    })
  })

})
