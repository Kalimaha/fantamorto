const firebase_configuration = {
  apiKey:             "AIzaSyCmxx5Czs79u-d6PkJYJm-t3cWDZIku6Ac",
  authDomain:         "fantamorto-4f1ad.firebaseapp.com",
  databaseURL:        "https://fantamorto-4f1ad.firebaseio.com",
  storageBucket:      "fantamorto-4f1ad.appspot.com",
  messagingSenderId:  "127221844118"
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

  firebase.database().ref(`${id()}`).on('value', function(snapshot) {
    $('#team').empty()

    for(tm in snapshot.val()) {
      $('#team').append(format_team_member(snapshot.val()[tm]))
    }
  })

  db().ref(`users/${u.id}`).set(u)

  firebase.database().ref(`ladder/${u.id}`).once('value').then(function(snapshot) {
    if(snapshot.val() == null) {
      db().ref(`ladder/${u.id}`).update({ team: u.name, budget: 0, points: 0 })
    }
  })

  firebase.database().ref('ladder').on('value', function(snapshot) {
    $('#ladder').empty()

    for(tm_id in snapshot.val()) {
      $('#read_only_ladder').append(format_read_only_ladder_member(tm_id, snapshot.val()[tm_id]))
    }
  })

  build_ui(u)
}

const build_ui = (user) => {
  $(placeholder).append(read_only_ladder())
  $('#login_area').append(welcome(user))
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
const logout          = () => {
  firebase.auth().signOut()

  $('#login_area').empty()
}

const append_login_buttons = () => {
  const buttons = [facebook_login_button(), google_login_button()]

  $(placeholder).append(buttons.join('<br><br>'))
}

const update_ladder = () => {
  $('#ladder tr').each(function() {
    const team = {
      team:   $($(this).find('input')[0]).val(),
      points: $($(this).find('input')[1]).val(),
      budget: $($(this).find('input')[2]).val()
    }

    db().ref(`ladder/${$(this).attr('id')}`).update(team).then(function() {
      $(placeholder).empty()
      $(placeholder).html(read_only_ladder())

      firebase.database().ref('ladder').on('value', function(snapshot) {
        $('#ladder').empty()

        for(tm_id in snapshot.val()) {
          $('#read_only_ladder').append(format_read_only_ladder_member(tm_id, snapshot.val()[tm_id]))
        }
      })
    })
  })
}

const ladder = () => `
  <table class="table table bordered table-hover table-condensed">
    <thead>
      <tr>
        <th>Squadra</th>
        <th>Punti</th>
        <th>Budget</th>
      </tr>
    </thead>
    <tbody id="ladder">
    </tbody>
  </table>
  <button class="btn btn-default" onclick="update_ladder()">
    Aggiorna Classifica
  </button>
  <br>
  <hr>
`

const read_only_ladder = () => `
  <table class="table table bordered table-hover table-condensed">
    <thead>
      <tr>
        <th>Squadra</th>
        <th>Punti</th>
        <th>Budget</th>
      </tr>
    </thead>
    <tbody id="read_only_ladder">
    </tbody>
  </table>
  <button class="btn btn-default" onclick="edit_ladder()">
    <i class="fa fa-wrench"></i> Modifica Classifica
  </button>
  <br>
  <hr>
`

const edit_ladder = () => {
  $(placeholder).empty()
  $(placeholder).html(ladder())

  firebase.database().ref('ladder').on('value', function(snapshot) {
    $('#ladder').empty()

    for(tm_id in snapshot.val()) {
      $('#ladder').append(format_ladder_member(tm_id, snapshot.val()[tm_id]))
    }
  })
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

const format_ladder_member = (tm_id, ladder_member) => `
  <tr id="${tm_id}">
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

const format_read_only_ladder_member = (tm_id, ladder_member) => `
  <tr id="${tm_id}">
    <td>${ladder_member.team}</td>
    <td>${ladder_member.points}</td>
    <td>${ladder_member.budget}</td>
  </tr>
`

const welcome = (user) => `
  <div class="row">
    <div class="col-xs-3">
      <img class="img-responsive minime" src="${user.picture}" />
    </div>
    <div class="col-xs-6">
      <p class="text-center">
        ${user.name}
      </p>
    </div>
    <div class="col-xs-3">
      <a class="pull-right" onclick="logout()">
        <i class="fa fa-sign-out"></i>
      </a>
    </div>
  </div>
  <hr>
`

const google_login_button = () => `
  <button class="btn btn-default" onclick="google_login()">
    <i class="fa fa-google"></i> Accedi con Google
  </button>
`

const facebook_login_button = () => `
  <button class="btn btn-default" onclick="facebook_login()">
    <i class="fa fa-facebook"></i> Accedi con Facebook
  </button>
`

const add_team_member_form = () => `
  <hr>
  <div class="row">
    <div class="col-lg-12">
      <input id="team_member"
             class="form-control"
             style="width: 100%; height: 23px;"
             placeholder="e.g. Caio Giulio Cesare" >
    </div>
    <br>
    <div class="col-lg-12">
      <button class="btn btn-default btn-xs" onclick="add_team_member()">
        Aggiungi alla mia Squadra
      </button>
    </div>
  </div>
`
