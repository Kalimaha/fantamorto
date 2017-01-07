app.controller('LadderEditController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  firebase.database().ref('ladder').orderByChild('points').on('value', function(snapshot) {
    $('#ladder').empty()

    snapshot.forEach(t => {
      $('#ladder').prepend(format_ladder_member(t.val()))
    })
  })

  $scope.save_ladder = () => {
    $('#ladder tr').each(function() {
      const team = {
        team:   $($(this).find('input')[0]).val(),
        points: $($(this).find('input')[1]).val(),
        budget: $($(this).find('input')[2]).val()
      }

      firebase.database().ref(`ladder/${$(this).attr('id')}`).update(team).then(() => {
        window.location = '#!/ladder'
      })
    })
  }
})

const format_ladder_member = (ladder_member) => `
  <tr id="${ladder_member.user}">
    <td>
      <input class="form-control" type="text" value="${ladder_member.team}" />
    </td>
    <td>
      <input class="form-control" type="text" value="${ladder_member.points}" />
    </td>
    <td>
      <input class="form-control" type="text" value="${ladder_member.budget}" />
    </td>
  </tr>
`
