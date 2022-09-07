import { gql }from 'graphql-tag'

module.exports = gql`
    type User{
        username:String!
        email:String!
        password:String!
    }

    type Query { 
        getUsers: [User]!
    }
    `