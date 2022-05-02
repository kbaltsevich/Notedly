const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 4000;

//схемы GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

//функции разрешения для полей схемы
const resolvers = {
  Query: {
    hello: () => 'Hello world'
  }
};

//Настройка Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  console.log(
    `GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
