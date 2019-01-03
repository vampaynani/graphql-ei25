const { GraphQLServer } = require('graphql-yoga');

const typeDefs = './schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');

const Person = require('./resolvers/Person');
const Date = require('./resolvers/Date');

const resolvers = {
  Query,
  Mutation,
  Person,
  Date
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('Server is running'));
