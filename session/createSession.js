const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const sessionCreation=(app,passport)=>{
    const store = new MongoDBStore({
        uri: 'mongodb+srv://arslan:Tiwana0111@cluster0.dlzbood.mongodb.net/?retryWrites=true&w=majority', // Replace with your MongoDB connection string
        collection: 'sessions',
      });
      app.use(session(
        { secret: 'abc', 
        resave: false, 
        saveUninitialized: false,
         rolling: true ,
         cookie: {
          maxAge: 365 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        },
         store: store, // Use MongoDB session store
      
        }));  //resave : to resave session on each request   ;  save unintiated to save even when null
      app.use(passport.initialize());                                    
      app.use(passport.session());                           
       
      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });                         
      // Debug route to check session data retrieval
      app.get('/debug-session', (req, res) => {
        console.log(req.session); // Output session data to the server console
        res.send('Check server console for session data');
      });
}

  module.exports=sessionCreation;