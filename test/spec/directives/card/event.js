'use strict';

describe('Directive: card/event', function () {

  // load the directive's module
  beforeEach(module('ubcNowClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<card/event></card/event>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the card/event directive');
  }));
});
