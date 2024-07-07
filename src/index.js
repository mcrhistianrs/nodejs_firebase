const cluster = require('cluster');
const os = require('os');
const express = require('express');
const RecordsController = require('./adapter/controllers/record.controller');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const recordsController = new RecordsController();

  app.use(express.json());

  app.use('/records', recordsController.getRouter());

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started, server is running on port ${PORT}`);
  });
}
