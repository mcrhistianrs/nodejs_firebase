const admin = require('firebase-admin');
const serviceAccount = require('../../firestore.json'); // Caminho para o arquivo JSON de configuração do Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com' // Substitua com a URL do seu projeto Firebase
});

const db = admin.firestore();

module.exports = { db };
