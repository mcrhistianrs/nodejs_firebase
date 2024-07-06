const express = require('express');
const recordsController = require('./adapter/controllers/record.controller');

const app = express();
app.use(express.json()); // Middleware para parsear corpos JSON

// Rotas
app.use('/records', recordsController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
