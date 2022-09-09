import { gql }from 'graphql-tag'

module.exports = gql`
    type User{
        firstName:String!
        lastName: String!
        username:String!
        email:String!
        password:String!
        birthday:String!
        gender:String!
    }

    type Query { 
        getUsers: [User]!
    }

    type Mutation {
        register (
            firstName:String!
            lastName:String!
            username:String!
            email:String!
            password:String!
            birthday:String!
            gender:String!): 
        User!
    }
    `