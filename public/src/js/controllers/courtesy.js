app.controller('CourtesyController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  $('#message').html($routeParams.message)
})
