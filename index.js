const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');
const app = express();


app.use(session({ secret: 'abc', resave: false, saveUninitialized: true }));  //resave : to resave session on each request   ;  save unintiated to save even when null
app.use(passport.initialize());                                    
app.use(passport.session());                           
                          

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</a>');
});
 
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] } // request the google to sign in with google account 

));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',          //if authentication is successfull than go to protected
    failureRedirect: '/auth/google/failure'  // if authentication failed then redirect to failure page
  })
);
function isLoggedIn(req, res, next) {  //Function to check if user is logged in or not
  req.user ? next() : res.sendStatus(401);
}
app.get('/protected', isLoggedIn, (req, res) => { //when user is logged in it will be directed to this page
  console.log(req.session)
  res.send(`Hello ${req.user.displayName}
   '<a href="/logout">Logout</a>'`);
   
});

app.get('/logout', (req, res) => { //when user press logout button on protected  
  req.logout();
  req.session.destroy();

  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(5000, () => console.log('listening on port: 5000'));
