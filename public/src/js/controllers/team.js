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
    <td>
      <a href="${google(team_member.name)}" target="_blank">
        ${team_member.name}
      </a>
    </td>
    <td>${yob(team_member.dob)}</td>
    <td>${team_member.points}</td>
  </tr>
`

const yob = (dob) => dob.substring(0, 4)

const google = (name) => `https://www.google.it/#q=${name}+${new Date().getFullYear()}`.replace(/\s/g, '+')
