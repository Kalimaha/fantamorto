app.controller('LoginController', function($scope, $routeParams, $http, $cookies, $cookieStore) {
  const facebook_provider = new firebase.auth.FacebookAuthProvider()
  const google_provider   = new firebase.auth.GoogleAuthProvider()

  $scope.google_login   = () => firebase.auth().signInWithRedirect(google_provider)
  $scope.facebook_login = () => firebase.auth().signInWithRedirect(facebook_provider)

  $scope.logout = () => {
    firebase.auth().signOut()

    window.location = '#!/login'
  }

  firebase.auth().onAuthStateChanged((firebase_user) => {
    if (firebase_user) { firebase_login_success(firebase_user) }
  })

  const firebase_login_success = (firebase_user) => {
    db().ref(`users/${firebase_user.uid}`).once('value').then((s) => {
      if (s.val() === null) { handle_new_user(fantamorto_user) }
      else                  { handle_existing_user(s.val())    }
    })
  }

  const handle_new_user = (firebase_user) => {
    const fm_usr = fantamorto_user(firebase_user, 'PENDING', false)
    $cookieStore.put('user', fm_usr, { expires: new Date(2017, 1, 1) })
    db().ref(`users/${$cookieStore.get('user').id}`).set($cookieStore.get('user'))
    db().ref(`ladder/${$cookieStore.get('user').id}`).once('value').then((s) => {
      if(s.val() === null) {
        const u = $cookieStore.get('user')
        db().ref(`ladder/${u.id}`).update({
          user:     u.id,
          picture:  u.picture,
          team:     u.name,
          budget:   0,
          points:   0
        })
      }
    })
  }

  const handle_existing_user = (existing_user) => {
    if (existing_user.status === 'APPROVED') {
      $cookieStore.put('user', existing_user, { expires: new Date(2017, 1, 1) })
      window.location = '#!/ladder'
    } else {
      window.location = '#!/courtesy/La richiesta di approvazione è stata inviata ad un nostro amministratore.'
    }
  }

  const fantamorto_user = (firebase_user, status, admin) => {
    return {
      id:       firebase_user.uid,
      email:    firebase_user.email,
      name:     firebase_user.displayName,
      picture:  firebase_user.photoURL,
      status:   status,
      admin:    admin
    }
  }

  const db = () => firebase.database()

  firebase.auth().getRedirectResult().catch((e) => $('#error_message').css('display', 'block'))
})
