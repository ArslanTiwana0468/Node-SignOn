const express = require('express');
const router = express.Router();
const deleteSession = require('../database/deleteSessionDb'); 


function isLoggedIn(req, res, next) {  //Function to check if user is logged in or not
  // console.log(req.session)
  req.session.passport ? next() : res.sendStatus(401);
}
router.get('/profile', isLoggedIn, async (req, res) => { //when user is logged in it will be directed to this page
  console.log(req.user.displayName+ req.user.email)
  res.send(`Hello ${req.user.displayName}
   '<a href="/user/logout">Logout</a>'`);
   
});
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error);
    } else {
      const sessionId = req.sessionID; // Retrieve the session ID
      deleteSession(sessionId); // Call the function to delete the session document
      res.send('Goodbye!');
    }
  });
});
  module.exports = router
  