app.controller('ApproveStatusController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  firebase.database().ref(`users/${$routeParams.id}`).once('value').then((snapshot) => {
    const user  = snapshot.val()

    var final_status = $routeParams.status.toUpperCase()
    if (final_status === 'ADMIN') { final_status = 'APPROVED' }

    user.status = final_status
    user.admin  = $routeParams.status.toUpperCase() == 'ADMIN'

    firebase.database().ref(`users/${$routeParams.id}`).update(user).then((p) => {
      $('#name').html(`<b>${user.name}</b>`)
      $('#status').html(`<b>${user.status}</b>`)
    })
  })

  $scope.home = () => window.location = `#!/`
})
