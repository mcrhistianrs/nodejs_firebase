const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// POST endpoint to save data to Firestore
app.post("/records", (req, res) => {
  const { data } = req.body;

  db.collection("records")
    .add(data)
    .then(docRef => {
      console.log(`Document written with ID: ${docRef.id}`);
      res.status(200).send({ message: 'Data saved successfully', id: docRef.id });
    })
    .catch(error => {
      console.error('Error adding document:', error);
      res.status(500).send({ message: 'Failed to save data' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
