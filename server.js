require('dotenv').config()

const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
require('./src/plugin/mongoose');

const app = express();

app.use('/graphiql', graphqlHTTP({ schema: require('./src/controllers/scheme.js'), graphiql: true}));

app.listen(8080, () => {
  console.log('Server running succefully...')
})