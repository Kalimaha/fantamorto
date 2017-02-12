app.config(($routeProvider) => {
  $routeProvider
  .when('/login',                   login_conf())
  .when('/ladder',                  ladder_conf())
  .when('/ladder/edit',             ladder_edit_conf())
  .when('/team/:id',                team_conf())
  .when('/team/:id/edit',           team_edit_conf())
  .when('/team/:id/remove/:member', team_remove_conf())
  .otherwise({ redirectTo: '/login' })
})

const login_conf = () => {
  return {
    templateUrl:  'src/html/login.html',
    controller:   'LoginController'
  }
}

const ladder_conf = () => {
  return {
    templateUrl:  'src/html/ladder.html',
    controller:   'LadderController'
  }
}

const ladder_edit_conf = () => {
  return {
    templateUrl:  'src/html/ladder_edit.html',
    controller:   'LadderEditController'
  }
}

const team_conf = () => {
  return {
    templateUrl:  'src/html/team.html',
    controller:   'TeamController'
  }
}

const team_edit_conf = () => {
  return {
    templateUrl:  'src/html/team_edit.html',
    controller:   'TeamEditController'
  }
}

const team_remove_conf = () => {
  return {
    templateUrl:  'src/html/team_remove.html',
    controller:   'TeamRemoveController'
  }
}
