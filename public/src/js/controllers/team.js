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
    <td>
      <a href="${google(team_member.name)}" target="_blank">
        ${team_member.name}
      </a>
    </td>
    <td>${team_member.points}</td>
  </tr>
`

const google = (name) => `https://www.google.it/#q=${name}+${new Date().getFullYear()}`.replace(/\s/g, '+')

const remove = (team, name) => {
  const member = name.replace(/\s/g, '+')

  window.location = `#!/team/${team}/remove/${member}`
}
