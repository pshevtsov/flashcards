'use strict';

app.controller('CardsCtrl', function ($scope, $modal, localStorageService) {
  $scope.cards = angular.fromJson(localStorageService.get('cards')) || [];

  $scope.$watch('cards', function () {
    localStorageService.add('cards', angular.toJson($scope.cards));
  }, true);

  $scope.card = [
    {image: '', text: ''},
    {image: '', text: ''}
  ];

  $scope.openModal = function (index) {
    var modalInstance = $modal.open({
      templateUrl: 'views/modal-content.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        index: function () {
          return index;
        },
        card: function () {
          if (index !== undefined) {
            $scope.card = $scope.cards[index];
          }
          return $scope.card;
        }
      }
    });

    modalInstance.result.then(function (result) {
      $scope.saveCard(result.index);
      if (result.open) {
        $scope.openModal();
      }
    });
  };

  $scope.usePredefined = function () {
    var base = window.location.protocol + '//' + window.location.host +
      window.location.pathname;
    $scope.cards = [
      [{
        text: 'Feles',
        image: base + '/images/latin.jpg'
      },
      {
        text: 'Cat',
        image: base + '/images/cat.jpg'
      }],
      [{
        text: 'Canis',
        image: base + '/images/latin.jpg'
      },
      {
        text: 'Dog',
        image: base + '/images/dog.png'
      }],
      [{
        text: 'Catulus suis',
        image: base + '/images/latin.jpg'
      },
      {
        text: 'Piglet',
        image: base + '/images/piglet.jpg'
      }]
    ];
    $scope.cards[0].visible = true;
  };

  $scope.saveCard = function (index) {
    $scope.cards.forEach(function (card) {
      card.visible = false;
    });

    $scope.card.visible = true;

    if (index !== undefined) {
      $scope.cards[index] = $scope.card;
    } else {
      $scope.cards.push($scope.card);
    }
    $scope.card = [
      {image: '', text: ''},
      {image: '', text: ''}
    ];
  };

  $scope.removeCard = function (index) {
    $scope.cards.splice(index, 1);
  };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, card, index) {
  $scope.card = card;

  $scope.ok = function (open) {
    $modalInstance.close({
      open: open,
      index: index
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
