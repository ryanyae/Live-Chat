import { gql } from 'graphql-tag'

module.exports = gql`
    type User{
        firstname:String!
        lastname: String!
        username:String!
        email:String!
        password:String!
        birthday:String!
        gender:String!
    }

    type Query { 
        getUsers: [User]!
        login(username: String! password: String!): User!
        getUser(username: String!): User!
    }

    type Mutation {
        register (
            username:String!
            password:String!
            email:String!
            firstname:String!
            lastname:String!
            birthday:String!
            gender:String!): 
        User!
    }
    `