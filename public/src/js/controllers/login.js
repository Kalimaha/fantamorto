app.controller('LoginController', function($scope, $routeParams, $http, $cookies, $cookieStore) {
  const facebook_provider = new firebase.auth.FacebookAuthProvider()
  const google_provider   = new firebase.auth.GoogleAuthProvider()

  $scope.google_login   = () => firebase.auth().signInWithRedirect(google_provider)
  $scope.facebook_login = () => firebase.auth().signInWithRedirect(facebook_provider)

  $scope.logout = () => {
    firebase.auth().signOut()

    window.location = '#!/login'
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $cookies.user = fantamorto_user(user)
      $cookieStore.put('user', fantamorto_user(user), { expires: new Date(2017, 1, 1) })

      db().ref(`users/${$cookies.user.id}`).set($cookieStore.get('user'))
      firebase.database().ref(`ladder/${$cookies.user.id}`).once('value').then(function(snapshot) {
        if(snapshot.val() == null) {
          const u = $cookieStore.get('user')
          db().ref(`ladder/${u.id}`).update({
            user: u.id,
            picture: u.picture,
            team: u.name,
            budget: 0,
            points: 0
          })
        }
      })

      redirect()
    }
  })

  const fantamorto_user = (user) => {
    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      picture: user.photoURL
    }
  }

  const id = () => firebase.auth().currentUser.uid
  const db = () => firebase.database()

  const redirect = () => window.location = '#!/ladder'

  firebase.auth().getRedirectResult().catch((e) => $('#error_message').css('display', 'block'))
})
