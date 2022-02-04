const mongoose = require('mongoose');
const config = require('../../config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Mongo Db connected.');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo Db disconnected.');
});

mongoose.connection.on('error', (error) => {
  console.log(`Mongo Db error:\n${error}`);
  process.exit(1);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongo Db disconnected through app termination (SIGINT).');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('Mongo Db disconnected through app termination (SIGTERM).');
    process.exit(0);
  });
});

process.once('SIGUSR2', () => {
  mongoose.connection.close(() => {
    console.log('Database disconnected through app termination (SIGUSR2).');
    process.kill(process.pid, 'SIGUSR2');
  });
});