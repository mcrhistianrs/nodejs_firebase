const express = require('express');
const AddRecord = require('../../application/usecases/add-record.usecase');

class RecordsController {
  constructor() {
    this.router = express.Router();
    this.addRecordUseCase = new AddRecord();

    // Middleware to parse JSON bodies
    this.router.use(express.json());

    // Define routes
    this.router.post('/', this.addRecord.bind(this));
  }

  async addRecord(req, res) {
    const { data } = req.body;

    try {
      const result = await this.addRecordUseCase.execute(data);
      res.status(200).json({ message: 'Data saved successfully', id: result.id });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save data' });
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RecordsController;
