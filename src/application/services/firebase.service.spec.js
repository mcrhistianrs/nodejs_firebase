// src/services/firebase.service.spec.js
const admin = require('firebase-admin');
const FirebaseService = require('./firebase.service');
const serviceAccount = require('./firestore.json'); // Adjust the path as needed

jest.mock('firebase-admin', () => {
  const firestoreMock = {
    collection: jest.fn(),
  };

  return {
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
    firestore: jest.fn(() => firestoreMock),
  };
});

describe('FirebaseService', () => {
  it('should initialize Firebase admin with the correct configuration', () => {
    new FirebaseService();

    expect(admin.initializeApp).toHaveBeenCalledWith({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firebase project URL
    });

    expect(admin.credential.cert).toHaveBeenCalledWith(serviceAccount);
    expect(admin.firestore).toHaveBeenCalled();
  });

  it('should set the db property to the firestore instance', () => {
    const firebaseService = new FirebaseService();
    expect(firebaseService.db).toBe(admin.firestore());
  });
});
