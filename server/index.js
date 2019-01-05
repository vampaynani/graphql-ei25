const { GraphQLServer, PubSub } = require('graphql-yoga');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const typeDefs = './schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Subscription = require('./resolvers/subscription');
const Person = require('./resolvers/Person');
const Date = require('./resolvers/Date');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Person,
  Date
};


const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: rawRequest => ({
    rawRequest,
    pubsub,
    isAuthorized: () => {
      const AuthHeader = rawRequest.request.header('authorization');
      if(!AuthHeader){
        throw "Unauthorized";
      }
      const token = AuthHeader.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, '12345');
      return decodedToken;
    }
  })
});

mongoose.connect('mongodb://localhost/graphql-c25');
server.start(() => console.log('Server is running'));
