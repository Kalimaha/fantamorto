app.controller('TeamRemoveController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  const member = $routeParams.member.replace('+', ' ')
  const msg = `Sei sicuro di voler rimuovere ${member} dalla tua squadra?`
  $('#message').html(msg)

  $scope.remove = () => {
    const member_id = $routeParams.member.replace('+', '').toLowerCase()
    firebase.database().ref(`${$routeParams.id}/${member_id}`).remove()

    window.location = `#!/team/${$routeParams.id}`
  }
})
