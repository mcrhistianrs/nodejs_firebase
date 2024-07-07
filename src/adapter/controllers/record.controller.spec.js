// src/interface/controllers/records-controller.spec.js
const express = require('express');
const request = require('supertest');
const RecordsController = require('./record.controller');
const AddRecord = require('../../application/usecases/add-record.usecase');

// Mock the AddRecord use case
jest.mock('../../application/usecases/add-record.usecase');

describe('RecordsController', () => {
  let app;
  let addRecordUseCase;

  beforeEach(() => {
    app = express();
    const recordsController = new RecordsController();
    app.use('/records', recordsController.getRouter());

    addRecordUseCase = recordsController.addRecordUseCase;
  });

  it('should save data successfully and return the document ID', async () => {
    const data = { name: 'John Doe', age: 30 };
    const mockResult = { id: '12345' };

    addRecordUseCase.execute = jest.fn().mockResolvedValue(mockResult);

    const response = await request(app)
      .post('/records')
      .send({ data });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Data saved successfully', id: '12345' });
    expect(addRecordUseCase.execute).toHaveBeenCalledWith(data);
  });

  it('should return a 500 status code when saving data fails', async () => {
    const data = { name: 'John Doe', age: 30 };
    const errorMessage = 'Failed to save data';

    addRecordUseCase.execute = jest.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/records')
      .send({ data });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
    expect(addRecordUseCase.execute).toHaveBeenCalledWith(data);
  });
});
