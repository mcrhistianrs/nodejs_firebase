const express = require('express');
const router = express.Router();
const { addRecord } = require('../../application/usecases/add-record.usecase');

// POST endpoint para salvar dados no Firestore
router.post('/', async (req, res) => {
  const { data } = req.body;

  try {
    const result = await addRecord(data);
    res.status(200).json({ message: 'Data saved successfully', id: result.id });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

module.exports = router;
