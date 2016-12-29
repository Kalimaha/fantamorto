const firebase_configuration = {
  apiKey: "AIzaSyCmxx5Czs79u-d6PkJYJm-t3cWDZIku6Ac",
  authDomain: "fantamorto-4f1ad.firebaseapp.com",
  databaseURL: "https://fantamorto-4f1ad.firebaseio.com",
  storageBucket: "fantamorto-4f1ad.appspot.com",
  messagingSenderId: "127221844118"
}

const facebook_provider = new firebase.auth.FacebookAuthProvider()
const google_provider   = new firebase.auth.GoogleAuthProvider()

const placeholder       = '#placeholder'
const messages          = '#messages'

const init = () => {
  firebase.initializeApp(firebase_configuration)

  firebase.auth().onAuthStateChanged(function(user) {
    $(placeholder).empty()

    if (user) { $(placeholder).append(welcome(fantamorto_user(user))) }
    else      { append_login_buttons() }
  })

  firebase.auth().getRedirectResult().catch(function(e) {
    if (e.code === 'auth/account-exists-with-different-credential') {
      $(messages).html(`
        <br>
        <div class="alert alert-danger" role="alert">
          Ti sei giá registrato in precedenza con un altro account. Usa quello!
        </div>
      `)
    }
  })
}

const fantamorto_user = (user) => {
  return {
    name: user.displayName,
    email: user.email,
    picture: user.photoURL
  }
}

const facebook_login  = () => firebase.auth().signInWithRedirect(facebook_provider)
const google_login    = () => firebase.auth().signInWithRedirect(google_provider)
const logout          = () => firebase.auth().signOut()

const append_login_buttons = () => {
  const buttons = [facebook_login_button(), google_login_button()]

  $(placeholder).append(buttons.join('<br><br>'))
}

const clear = () => {
  $(placeholder).empty()
  $(messages).empty()
}

const welcome = (user) => `
  <img class="img-responsive center-block" src="${user.picture}" />
  <h2 class="text-center">
    Benvenuto, ${user.name}!
  </h2>
`

const google_login_button = () => `
  <button class="btn" onclick="google_login()">
    <i class="fa fa-google"></i> Accedi con Google
  </button>
`

const facebook_login_button = () => `
  <button class="btn" onclick="facebook_login()">
    <i class="fa fa-facebook"></i> Accedi con Facebook
  </button>
`
