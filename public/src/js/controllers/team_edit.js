app.controller('TeamEditController', function($scope, $routeParams, $http, $cookies, $cookieStore, logoutService) {
  $scope.add_team_member = () => {
    const team_member = {
      id:     id(),
      name:   name().replace(/\b\w/g, l => l.toUpperCase()),
      dob:    dob(),
      points: points(),
      price:  price()
    }

    if(is_valid_form()) {
      firebase.database().ref(`${$routeParams.id}/${id()}`).update(team_member).then(() => {
        window.location = `#!/team/${$routeParams.id}`
      })
    } else {
      show_message()
    }
  }

  $('#dob').on('keyup', function() {
    const points = 110 - (new Date().getFullYear() - new Date($(this).val()).getFullYear())
    const text = isNaN(points) ? 'Inserisci la data completa' : points

    $('#points').html(text)
  })
})

const id      = () => $('#name').val().toLowerCase().replace(/\s/g, '')
const name    = () => $('#name').val()
const dob     = () => $('#dob').val()
const points  = () => 110 - (new Date().getFullYear() - new Date($('#dob').val()).getFullYear())
const price   = () => $('#price').val()

const is_valid_form = () => {
  return  name().length > 0
          dob().length > 0
          points().length > 0
          price().length > 0
}

const show_message = () => {
  const html = `
    <div class="alert alert-danger alert-dismissable">
      TUTTI i campi sono obbligatori. Dai su...
    </div>
  `

  $('#message').html(html)
}
