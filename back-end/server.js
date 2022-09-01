const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models')

const typeDefs = require('./graphql/typeDefs.tsx');
const resolvers = require('./graphql/resolvers.tsx')

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize
  .authenticate()
  .then(() => {console.log('!!Connected!!')})
  .catch((err) => {console.log(err)})
});