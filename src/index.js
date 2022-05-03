const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();
const db = require('./db');
const DB_HOST = process.env.DB_HOST;
const models = require('./models');

//схемы GraphQL
const typeDefs = require('./schemas');

//функции разрешения для полей схемы
const resolvers = require('./resolvers');

db.connect(DB_HOST);

//Настройка Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  }
});
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  console.log(
    `GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
