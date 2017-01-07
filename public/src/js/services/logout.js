app.factory('logoutService', () => {
  return {
    build_logout: ($cookies, $cookieStore) => {

      const html = `
        <div class="row">
          <div class="col-xs-3">
            <img class="img-responsive minime" src="${$cookieStore.get('user').picture}" />
          </div>
          <div class="col-xs-6">
            <p class="text-center">
              ${$cookieStore.get('user').name}
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

      $('#login_area').html(html)
    }
  }
})
