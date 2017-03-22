(function () {
  "use-strict";

  var config = {
    apiKey: "AIzaSyAhsxjSlEAR5EePbBLd3ejU8_BTfbtx3BQ",
    authDomain: "savemy-song.firebaseapp.com",
    databaseURL: "https://savemy-song.firebaseio.com",
    storageBucket: "savemy-song.appspot.com",
    messagingSenderId: "121098465429"
  };

  firebase.initializeApp(config);

  angular
    .module('app', ['firebase', 'ngMaterial', 'ngRoute'])
    .config(function ($firebaseRefProvider, $mdThemingProvider, $routeProvider) {
      $routeProvider
        .when('/playlist', {
          template: '<playlist></playlist>'
        })
        .when('/recording', {
          template: '<recording></recording>'
        })
        .when('/first', {
          template: '<first></first>',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$requireSignIn();
            }]

          }
        })
        .otherwise({
          redirectTo: '/'
        })

      $mdThemingProvider.theme('default')
        .primaryPalette('orange', {
          'default': '400', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('purple', {
          'default': '200' // use shade 200 for default, and keep all other shades the same
        });

      $firebaseRefProvider.registerUrl({
        default: config.databaseURL,
        object: `${config.databaseURL}/angular/object`,
        recipe: `${config.databaseURL}/recipes/`,

      });
    })
    .factory('ObjectFactory', ObjectFactory)
    .factory('PlaylistFactory', PlaylistFactory)
    .controller('MyCtrl', MyCtrl)
    .factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
      return $firebaseAuth();
    }]);

  function ObjectFactory($firebaseObject, $firebaseRef) {
    return $firebaseObject($firebaseRef.object);
  }

  function PlaylistFactory($firebaseArray, $firebaseRef) {
    return $firebaseArray($firebaseRef.recipe);
  }

  function MyCtrl(ObjectFactory, Auth, $scope, $mdSidenav) {


    this.signIn = signIn;
    this.toggleLeft = toggleLeft;
    var userLoggedIn;

    this.auth = Auth;

    this.auth.$onAuthStateChanged(function (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    }, this);




    this.sayHello = () => {
      return `Hello, ${$scope.firebaseUser.displayName}`;
    }

    function toggleLeft() {
      $mdSidenav('left').toggle();
    }

    function signIn() {
      this.auth.$signInWithPopup('facebook').then(function (firebaseUser) {
        $scope.firebaseUser = firebaseUser;

      }).catch(function (error) {
        console.log(error);
        this.error = error;
      })

    }

  }

  const ctrl = new MyCtrl({
    name: 'Eduardo'
  });
  const message = ctrl.sayHello();
  //   console.assert(message === 'Hello, Alice', `Expected Alice`, ``);

}());