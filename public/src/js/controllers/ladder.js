app.controller('LadderController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  logoutService.build_logout($cookies, $cookieStore)

  firebase.database().ref('ladder').orderByChild('points').on('value', function(snapshot) {
    $('#ladder').empty()

    snapshot.forEach(t => {
      $('#ladder').prepend(format_read_only_ladder_member(t.val()))
    })
  })

  $scope.edit_ladder = () => window.location = '#!/ladder/edit'
})

const format_read_only_ladder_member = (ladder_member) => `
  <tr id="${ladder_member.user}">
    <td>
      <img class="img-responsive minime" src="${ladder_member.picture}" />
    </td>
    <td>
      <a href="#!/team/${ladder_member.user}">
        ${ladder_member.team}
      </a>
    </td>
    <td>${ladder_member.points}</td>
    <td>${ladder_member.budget}</td>
  </tr>
`
