const { MongoClient } = require('mongodb');

async function deleteSession(sessionId) {
    const uri = 'mongodb+srv://arslan:Tiwana0111@cluster0.dlzbood.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
    const dbName = 'test'; // Name of your MongoDB database
    const collectionName = 'sessions'; // Name of the collection that stores the sessions
  
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
  
      const db = client.db(dbName);
      const sessionsCollection = db.collection(collectionName);
  
      // Delete the session document based on the session identifier
      await sessionsCollection.deleteOne({ _id: sessionId });
  
      console.log('Session deleted successfully');
    } catch (error) {
      console.error('Error deleting session:', error);
    } finally {
      await client.close();
    }
  }
  module.exports=deleteSession;