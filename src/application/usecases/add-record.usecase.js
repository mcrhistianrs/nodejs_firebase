const FirebaseService = require('../services/firebase.service');

class AddRecord {
  constructor() {
    this.firebaseService = new FirebaseService();
    this.db = this.firebaseService.db;
  }

  async execute(data) {
    try {
      const docRef = await this.db.collection('records').add(data);
      return { id: docRef.id };
    } catch (error) {
      throw new Error('Failed to save data');
    }
  }
}

module.exports = AddRecord;
