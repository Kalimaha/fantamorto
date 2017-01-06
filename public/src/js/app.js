const app = angular.module('Fantamorto', ['ngRoute'])

const firebase_configuration = {
  apiKey:             "AIzaSyCmxx5Czs79u-d6PkJYJm-t3cWDZIku6Ac",
  authDomain:         "fantamorto-4f1ad.firebaseapp.com",
  databaseURL:        "https://fantamorto-4f1ad.firebaseio.com",
  storageBucket:      "fantamorto-4f1ad.appspot.com",
  messagingSenderId:  "127221844118"
}

firebase.initializeApp(firebase_configuration)
