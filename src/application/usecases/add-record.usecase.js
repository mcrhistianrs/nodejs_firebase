const FirebaseService = require('../services/firebase.service');

class AddRecord {
  constructor() {
    this.firebaseService = new FirebaseService();
    this.db = this.firebaseService.db;
  }

  async execute(data) {
    try {
      const docRef = await this.db.collection('records').add(data);
      console.log(`Document written with ID: ${docRef.id}`);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error adding document:', error);
      throw new Error('Failed to save data');
    }
  }
}

module.exports = AddRecord;
