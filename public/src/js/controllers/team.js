app.controller('TeamController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  firebase.database().ref(`${$routeParams.id}`).orderByChild('points').on('value', function(snapshot) {
    $('#team').empty()

    snapshot.forEach(t => {
      $('#team').append(format_team_member($routeParams.id, t.val()))
    })

    if (snapshot.val() == null) { $('#team').append(empty_team()) }
  })

  $scope.add_team_member  = () => window.location = `#!/team/${$routeParams.id}/edit`
  $scope.back_to_ladder   = () => window.location = `#!/ladder`
})

const empty_team = () => `
  <tr>
    <td colspan="4" class="text-center">
      Non hai nessuno in squadra, aggiungi qualche morituro.
    </td>
  </tr>
`

const format_team_member = (team, team_member) => `
  <tr>
    <td>${team_member.name}</td>
    <td>${team_member.points}</td>
    <td>${team_member.price}</td>
    <td>
      <button class="btn btn-default btn-sm" onclick="remove('${team}', '${team_member.name}');">
        <i class="fa fa-trash"></i>
      </button>
    </td>
  </tr>
`

const age = (dob) => new Date().getFullYear() - new Date(dob).getFullYear()

const remove = (team, name) => {
  const member = name.replace(/\s/g, '+')

  window.location = `#!/team/${team}/remove/${member}`
}
