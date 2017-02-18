app.controller('ApproveController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  firebase.database().ref(`users/${$routeParams.id}`).once('value').then((snapshot) => {
    const user = snapshot.val()

    $('#name').html(`<b>${user.name}<b> (<a href="mailto:${user.email}">${user.email}</a>)`)
  })

  $scope.approve  = () => window.location = `#!/approve/${$routeParams.id}/approved`
  $scope.admin    = () => window.location = `#!/approve/${$routeParams.id}/admin`
  $scope.ban      = () => window.location = `#!/approve/${$routeParams.id}/banned`
})
