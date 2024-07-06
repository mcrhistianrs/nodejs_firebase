const { db } = require('../services/firebase.service');

async function addRecord(data) {
  try {
    const docRef = await db.collection('records').add(data);
    console.log(`Document written with ID: ${docRef.id}`);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error adding document:', error);
    throw new Error('Failed to save data');
  }
}

module.exports = { addRecord };
