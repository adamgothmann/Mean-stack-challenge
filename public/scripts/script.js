console.log('sourced');
var myApp = angular.module('myApp', []);

myApp.controller('heroController', ['$scope', '$http', function($scope, $http){
  $scope.addHero = function(){
    event.preventDefault();
    var objectToSend = {
      alias: $scope.alias,
      first_name: $scope.first_name,
      last_name: $scope.last_name,
      city: $scope.city,
      power_name: $scope.power_name
    };//end objectToSend
    console.log(objectToSend);
    $http({
      method: "POST",
      url: "/sendHero",
      data: objectToSend
    });//end $http
    $scope.alias = '';
    $scope.first_name = '';
    $scope.last_name = '';
    $scope.city = '';
    $scope.power_name = '';
    $scope.showHeroes();
  };//end addHero
  $scope.showHeroes = function(){
    $http({
      method: 'GET',
      url: '/showHero'
    }).then(function(response){
      $scope.allHeroes = response.data;
      console.log($scope.allHeroes);
      console.log($scope.allHeroes.length);
    });//end .then
  };//end ShowHeroes
}]);//end heroController
