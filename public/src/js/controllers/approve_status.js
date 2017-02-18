app.controller('ApproveStatusController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  firebase.database().ref(`users/${$routeParams.id}`).once('value').then((snapshot) => {
    const user  = snapshot.val()
    user.status = $routeParams.status.toUpperCase()
    user.admin  = $routeParams.status.toUpperCase() == 'ADMIN'

    firebase.database().ref(`users/${$routeParams.id}`).update(user).then((p) => {
      $('#name').html(`<b>${user.name}</b>`)
      $('#status').html(`<b>${user.status}</b>`)
    })
  })

  $scope.home = () => window.location = `#!/`
})
