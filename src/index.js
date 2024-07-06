const express = require('express');
const RecordsController = require('./adapter/controllers/record.controller');

const app = express();
const recordsController = new RecordsController();

app.use(express.json()); // Middleware to parse JSON bodies

// Use the router from the controller class
app.use('/records', recordsController.getRouter());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
