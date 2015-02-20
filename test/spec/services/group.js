'use strict';

describe('Service: Group', function () {

  // load the service's module
  beforeEach(module('ubcNowClientApp'));

  // instantiate service
  var Group;
  beforeEach(inject(function (_Group_) {
    Group = _Group_;
  }));

  it('should do something', function () {
    expect(!!Group).toBe(true);
  });

});
