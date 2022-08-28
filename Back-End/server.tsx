var require
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {
    GraphQLSchema, 
    GraphQLObjectType } = require('graphql')
const expressGraphQL = require('express-graphql').graphqlHTTP
const app = express()

app.use('/graphql', expressGraphQL({
    graphiql:true
}))

app.listen(5000, () => {console.log("connected")})