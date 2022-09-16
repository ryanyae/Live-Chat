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
        token:String
    }

    type Query { 
        getUsers: [User]!
        login(username: String! password: String!): User!
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