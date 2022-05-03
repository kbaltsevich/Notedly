const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();
const db = require('./db');
const DB_HOST = process.env.DB_HOST;

//mock data
let notes = [
  { id: '1', content: 'This is note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'This is another-another note', author: 'Riley Harrison' }
];

//схемы GraphQL
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

//функции разрешения для полей схемы
const resolvers = {
  Query: {
    hello: () => 'Hello world',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'K.B.'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

db.connect(DB_HOST);

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
