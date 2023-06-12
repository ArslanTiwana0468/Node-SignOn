const connectToMongo = require('./database/connectDb');  //import external module into this file.(export of module are returned )
const express = require('express');
const passport = require('passport');
const sessionCreation = require('./session/createSession');  //import external module into this file.(export of module are returned )
// const cors=require('cors')
connectToMongo();
require('./facebookAuth');
require('./googleAuth');

const app = express();
app.use(express.json())
sessionCreation(app,passport)


app.get('/', (req, res) => {
  console.log("hello")
  res.send('<a href="/auth/google">Sign in with Google</a><br/><a href="/auth/facebook">Sign in with Facebook</a>');
});
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] } // request the google to sign in with google account 
));
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: [ 'profile' ] } 
));

app.get( '/auth/facebook/callback',
  passport.authenticate( 'facebook', {
    successRedirect: '/user/profile',          //if authentication is successfull than go to protected
    failureRedirect: '/auth/failure'  // if authentication failed then redirect to failure page
  })
);
app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/user/profile',          //if authentication is successfull than go to protected
    failureRedirect: '/auth/failure'  // if authentication failed then redirect to failure page
  })
);
app.use('/user', require('./routes/user'))

app.get('/auth/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(5000, () => console.log('listening on port: 5000'));
