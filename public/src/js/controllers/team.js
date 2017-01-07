app.controller('TeamController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  firebase.database().ref(`${$routeParams.id}`).orderByChild('points').on('value', function(snapshot) {
    snapshot.forEach(t => {
      $('#team').append(format_team_member(t.val()))
    })
  })

  $scope.add_team_member  = () => window.location = `#!/team/${$routeParams.id}/edit`
  $scope.back_to_ladder   = () => window.location = `#!/ladder`
})

const format_team_member = (team_member) => `
  <tr>
    <td>${team_member.name}</td>
    <td>${age(team_member.dob)}</td>
    <td>${team_member.points}</td>
    <td>${team_member.price}</td>
  </tr>
`

const age = (dob) => new Date().getFullYear() - new Date(dob).getFullYear()
