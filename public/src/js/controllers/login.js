app.controller('LoginController', function($scope, $routeParams, $http) {
  const facebook_provider = new firebase.auth.FacebookAuthProvider()
  const google_provider   = new firebase.auth.GoogleAuthProvider()

  $scope.google_login   = () => firebase.auth().signInWithRedirect(google_provider)
  $scope.facebook_login = () => firebase.auth().signInWithRedirect(facebook_provider)

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      redirect()
    } else {
      console.log('stay here')
    }

    // $(placeholder).empty()

    // if (user) { init_user(user) }
    // else      { append_login_buttons() }
  })

  const redirect = () => window.location = '#!/ladder'

  firebase.auth().getRedirectResult().catch((e) => $('#error_message').css('display', 'block'))
})
