var books = require('./controllers/books.controller'),
    users = require('./controllers/users.controller'),
    multer = require('multer'),
    contact = require('./controllers/mail.controller.js');

module.exports = function(app){

  var upload = multer({dest: './uploads/'});

  app.route('/signup')
      .post(users.signup);

  app.route('/signin')
      .post(users.login);

  app.route('/logout')
      .get(users.logout);

  app.get('/user', users.currentUser);

  //facebook

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/books',
    failureRedirect: '/',
    scope: ['email', 'public_profile']
  }));

  //twitter

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/books',
    failureRedirect: '/'
  }));

  //google
  app.get('/auth/google', passport.authenticate('google', {successRedirect: '/books', scope: ['profile', 'email']}));

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/books'
  }))

  //books
  app.route('/api/books')
    .get(books.listBooks)
    .post(users.authenticate, upload.single('bookCover'), books.uploadBookCover, books.createBook);

  app.route('/api/books/:bookId')
    .get(users.authenticate, books.findBook)
    .delete(users.authenticate, books.deleteBook)
    .put(users.authenticate, upload.single('bookCover'),  books.uploadBookCover, books.update);

  app.route('/api/books/donor/:donorId')
    .get(users.authenticate, books.booksByDonor);

  app.get('/*', function(req, res){
    res.sendfile('public/index.html');
  });

  //contact
  app.route('/api/contact')
    .post(contact.sendMail);
}