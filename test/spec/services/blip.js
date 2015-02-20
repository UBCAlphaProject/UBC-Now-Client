'use strict';

describe('Service: Blip', function () {

  // load the service's module
  beforeEach(module('ubcNowClientApp'));

  // instantiate service
  var Blip;
  beforeEach(inject(function (_Blip_) {
    Blip = _Blip_;
  }));

  it('should do something', function () {
    expect(!!Blip).toBe(true);
  });

});
