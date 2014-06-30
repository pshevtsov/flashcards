'use strict';

describe('Directive: deck', function () {

  // load the directive's module
  beforeEach(module('flashcardsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<deck></deck>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the deck directive');
  }));
});
