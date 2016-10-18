var bookedUpApp = angular.module("bookedUpApp", ['ngRoute', 'ngFileUpload', 'ui.materialize'])

bookedUpApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/books', {
    templateUrl: 'allBooks/allBooks.html'
  })
  .when('/books/new', {
    templateUrl: 'newBook/newBook.html'
  })
  .when('/books/:bookId', {
    templateUrl: 'book/book.html'
  })
  .when('/books/donor/:donorId', {
    templateUrl: 'donorBooks/donorBooks.html'
  })
  .when('/books/:bookId/edit', {
    templateUrl: 'editBook/editBook.html'
  })
  .when('/contact', {
    templateUrl: 'contact/contact.html'
  })
  .otherwise({
    redirectTo: '/'
  });

  //use the HTML5 History API (get rid of the # in the urls)
  $locationProvider.html5Mode(true);
}]);

bookedUpApp.run(['$rootScope', 'authenticationService','$location', function($rootScope, authenticationService, $location){
  $rootScope.$on('$routeChangeStart', function(){
    authenticationService.currentUser().then(function(resp){
      if($location.path() == '/'){
        $location.path('/books');
      }
    }).catch(function(error){
      $location.path('/')
    })

  })
}]);