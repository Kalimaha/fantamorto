app.config(($routeProvider) => {
  $routeProvider
  .when('/login',   login_conf())
  .when('/ladder',  ladder_conf())
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
