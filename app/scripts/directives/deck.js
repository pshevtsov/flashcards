'use strict';

app.directive('deck', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      cards: '='
    },
    link: function postLink(scope) {
      scope.currentIndex = 0;
      scope.currentSide = 0;

      scope.next = function () {
        if (scope.currentIndex < scope.cards.length - 1) {
          scope.currentIndex++;
        } else {
          scope.currentIndex = 0;
        }
      };

      scope.prev = function () {
        if (scope.currentIndex > 0) {
          scope.currentIndex--;
        } else {
          scope.currentIndex = scope.cards.length - 1;
        }
      };

      scope.flip = function () {
        scope.currentSide = (scope.currentSide === 0) ? 1 : 0;
      };

      scope.edit = function (idx) {
        scope.$parent.openModal(idx);
      };

      scope.delete = function (idx) {
        scope.$parent.removeCard(idx);
        if (scope.cards.length > 1) {
          scope.next();
        } else if (scope.cards.length === 1) {
          scope.cards[0].visible = true;
        }
      };

      scope.$watch('currentIndex', function () {
        scope.cards.forEach(function (card) {
          card.visible = false;
        });

        if (angular.isDefined(scope.cards[scope.currentIndex])) {
          scope.cards[scope.currentIndex].visible = true;
        }
        scope.currentSide = 0;
      });
    },
    templateUrl: 'views/deck.html'
  };
});

app.directive('bgImg', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var url = attrs.bgImg;
      element.css({
         'background-image': 'url(' + url + ')',
         'background-size': 'cover'
      });
    }
  };
});
