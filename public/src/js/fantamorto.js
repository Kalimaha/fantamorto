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
const team_member       = '#team_member'

const init = () => {
  firebase.initializeApp(firebase_configuration)

  firebase.auth().onAuthStateChanged(function(user) {
    $(placeholder).empty()

    if (user) { init_user(user) }
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

const init_user = (user) => {
  const u = fantamorto_user(user)

  $(placeholder).append(welcome(u)).append(team()).append(add_team_member_form())

  firebase.database().ref(`${id()}`).on('value', function(snapshot) {
    $('#team').empty()
    
    for(tm in snapshot.val()) {
      $('#team').append(format_team_member(snapshot.val()[tm]))
    }
  })

  db().ref(`users/${u.id}`).set(u)
}

const add_team_member = () => {
  const tm = $(team_member).val().toLowerCase().replace(/\s/g, '')

  db().ref(`${id()}/${tm}`).set({
    name: $(team_member).val(),
    age: 123
  }).then(function() {
    $(messages).html(`
      <br>
      <div class="alert alert-success" role="alert">
        ${$(team_member).val()} é stato aggiunto con successo alla tua squadra.
      </div>
    `)
    $(team_member).val('')
  })
}

const id = () => firebase.auth().currentUser.uid

const db = () => firebase.database()

const fantamorto_user = (user) => {
  return {
    id: user.uid,
    email: user.email,
    name: user.displayName,
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

const team = () => `
  <br>
  <table class="table table bordered table-hover table-condensed">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Etá</th>
      </tr>
    </thead>
    <tbody id="team">
    </tbody>
  </table>
`

const format_team_member = (team_member) => `
  <tr>
    <td>${team_member.name}</td>
    <td>${team_member.age}</td>
  </tr>
`

const welcome = (user) => `
  <img class="img-responsive center-block" src="${user.picture}" />
  <h4 class="text-center">
    Benvenuto, ${user.name}!
  </h4>
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

const add_team_member_form = () => `
  <hr>
  <div class="row">
    <div class="col-lg-12">
      <input id="team_member" class="form-group" style="width: 100%; height: 23px;">
    </div>
    <div class="col-lg-12">
      <button class="btn" onclick="add_team_member()">
        Aggiungi alla mia Squadra
      </button>
    </div>
  </div>
`
