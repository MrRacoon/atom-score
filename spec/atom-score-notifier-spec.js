'use babel';

import { notify } from '../lib/atom-score-notifier'

describe('The notification system', function () {

  beforeEach(function () {
    //spy = sinon.spy(atom.notifications)
  });

  describe('the notify function', function () {
    it('should call the right kind of notification', function () {
      notify('addSuccess', 'asdf')
      // expect(spy.addSuccess).wasCalled()
    });

  });

});
