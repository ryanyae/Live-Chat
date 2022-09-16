const { ApolloServer, gql } = require('apollo-server');
const {sequelize} = require('./models')

// The GraphQL schema
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx:any) => ctx,
});

server.listen().then((url:any) => {
  console.log(`🚀 Server ready at ${url.url}`);

  sequelize
  .authenticate()
  .then(() => {console.log('!!CONNECTED!!')})
  .catch((err:Object) => {console.log(err)}) 
});