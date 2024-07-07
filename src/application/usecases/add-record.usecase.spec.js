// src/application/usecases/add-record.usecase.spec.js
const AddRecord = require('./add-record.usecase');
const FirebaseService = require('../services/firebase.service');

// Mock the FirebaseService
jest.mock('../services/firebase.service');

describe('AddRecord UseCase', () => {
  let addRecord;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      add: jest.fn()
    };

    FirebaseService.mockImplementation(() => {
      return {
        db: mockDb
      };
    });

    addRecord = new AddRecord();
  });

  it('should add a record and return the document ID', async () => {
    const data = { name: 'John Doe', age: 30 };
    const mockDocRef = { id: '12345' };

    mockDb.add.mockResolvedValue(mockDocRef);

    const result = await addRecord.execute(data);

    expect(mockDb.collection).toHaveBeenCalledWith('records');
    expect(mockDb.add).toHaveBeenCalledWith(data);
    expect(result).toEqual({ id: '12345' });
  });

  it('should throw an error when adding a document fails', async () => {
    const data = { name: 'John Doe', age: 30 };
    const errorMessage = 'Failed to save data';

    mockDb.add.mockRejectedValue(new Error('Database error'));

    await expect(addRecord.execute(data)).rejects.toThrow(errorMessage);
  });
});
