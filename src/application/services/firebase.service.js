const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json'); // Path to your Firebase JSON configuration file

class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://your-project-id.firebaseio.com' // Replace with your Firebase project URL
    });

    this.db = admin.firestore();
  }
}

module.exports = FirebaseService;
