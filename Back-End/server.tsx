var require

const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./dataBase/models')

// A map of functions which return data for the schema.

const resolvers = require("./graphql/resolvers.tsx")
const typeDefs = require("./graphql/typeDefs.tsx")

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize
  .authenticate()
  .then(() => {console.log('Database connected')})
  .catch((err) => {console.log(err)}) });