const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    firstName: String!
    lastName:String!
    email:String!
    username: String!
    password: String!
  }
  type Query {
  getUsers: [User]!
  }
`
    
