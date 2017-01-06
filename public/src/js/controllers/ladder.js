app.controller('LadderController', function($scope, $routeParams, $http) {
  firebase.database().ref('ladder').on('value', function(snapshot) {
    snapshot.forEach(t => {
      $('#ladder').append(format_read_only_ladder_member(t.val()))
    })
  })
})

const format_read_only_ladder_member = (ladder_member) => `
  <tr id="???">
    <td>${ladder_member.team}</td>
    <td>${ladder_member.points}</td>
    <td>${ladder_member.budget}</td>
  </tr>
`
