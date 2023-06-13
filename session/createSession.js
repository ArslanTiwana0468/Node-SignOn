const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cron = require('node-cron');

const sessionCreation = (app, passport) => {
  const store = new MongoDBStore({
    uri: 'mongodb+srv://arslan:Tiwana0111@cluster0.dlzbood.mongodb.net/?retryWrites=true&w=majority', // Replace with your MongoDB connection string
    collection: 'sessions',
    touchAfter: 60 // Time (in seconds) after which session will be touched/updated in the database

  });
  app.use(session(
    {
      secret: 'abc',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 1 * 60 * 1000, // 7 days in milliseconds
      },
      store: store, // Use MongoDB session store

    }));  //resave : to resave session on each request   ;  save unintiated to save even when null
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  // Debug route to check session data retrieval
  app.get('/debug-session', (req, res) => {
    console.log(req.session); // Output session data to the server console
    res.send('Check server console for session data');
  });
var counter=0;
// Delete expired sessions from the database
setInterval(() => {
  const currentTime = new Date().getTime();
  store.all((err, sessions) => {
    if (err) {
      console.error('Error retrieving sessions:', err);
    } else {
      sessions.forEach((session) => {
        if (session.expires < currentTime) {
          store.destroy(session._id, (err) => {
            if (err) {
              console.error('Error deleting session:', err);
            } else {
              console.log('Expired session deleted successfully');
            }
          });
        }
      });
    }
    counter=counter+1 
    console.log('counter'+counter)
  });
  
}, 60000); // Run every minute (60,000 milliseconds)


  // const cron = require('node-cron');

  // // Schedule a task to delete expired sessions every hour
  // cron.schedule('0 * * * *', async () => {
  //   const expirationDate = new Date();
  //   expirationDate.setHours(expirationDate.getMinutes() - 1); // Expire sessions older than 1 hour

  //   try {
  //     await store.destroy({
  //       expires: { $lt: expirationDate }
  //     });
  //     console.log('Expired sessions deleted successfully');
  //   } catch (err) {
  //     console.error('Error deleting expired sessions:', err);
  //   }
  // });
}

module.exports = sessionCreation;