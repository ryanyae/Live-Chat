import { AuthenticationError, UserInputError } from "apollo-server"

const jwt = require('jsonwebtoken')
const { User } = require("../models")
const bcrypt = require('bcrypt')
const SALT = 10

//To ensure security the JsonWebToken is imported from "../config/env.json" where the entire folder is ignored by
// github, so when running ensure that config folder has apporpriate files such as the config.json and, now, the env.json
const {secretJWT} = require('../config/env.json')
const { Op } = require('sequelize')

//Object that could consist of different errors that correspond to the user inputs.
//We establish error objects before the try-catches so that we can handle specific eorrors at a time
//  when we have multiple errors when we login or register, there can be mulitple errors, but pinpointing 
//  the exact type of error and will be easier if we just through an entire object and parse such object at 
//  the catch statement.
//*NOTE* We do not handle errors where input fields are empty in the backend, all that tedious inspection
//  will be handled by methods in the front-end.
//*NOTE* When storing errors inside this object, each element of this object will a string
interface ErrorObject {
    username?: string,
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    birthday?: string
}



//Object type for user inputs when registering
interface registerObject {
    username?: string,
    password?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    birthday?: string,
    gender?: string
}

//Object type for user inputs trying to login
interface loginObject {
    username?: string,
    password?: string
}


module.exports = {

    Query: {
        //when called, supplies every user in the database
        getUsers: async (_:any, __:any, context:any) => {

            try {
                let user:any

                
                if (context.req && context.req.headers.authorization){
                    const headerToken:string = context.req.headers.authorization.split("Bearer ")[1]

                    jwt.verify(headerToken, secretJWT, (err:object, decodedToken:any)=> {
                        if (err) throw new AuthenticationError('Bad Token')

                        user = decodedToken
                    })
                }

                //Look for all users
                const users = await User.findAll({
                        where: { username: {[Op.ne]: user.username}
                        }
                    })

                //return users
                return users

            } catch (err:any) {
                console.log(err)
                throw err
                
            }
        },

        //when called, authenticates users when given username and password input
        login: async (_:any, args:Object) => {
            let errors:ErrorObject = {}

            let { username, password }:loginObject = args

            try {
            
                //look through database for given username
                const user = await User.findOne({ where: { username } })

                if (!user) {
                    errors.username = 'user not found'
                }

                if(Object.keys(errors).length > 0) {
                    throw new UserInputError('user not found', { errors })
                }

                //authenticate password
                const passwordVerification = await bcrypt.compare( password, user.password )

                if (!passwordVerification) {
                    errors.password = "incorrect login"    
                    throw new AuthenticationError('wrong password', { errors })
                }

                //after logging in the system will store information within a JWT (jsonWebToken) which will act like a verification
                user.token = jwt.sign({ username }, secretJWT,{ expiresIn: '1h' });

                //return user object
                return (user)

            } catch (err) {
                throw err
            }
        }
    },

    Mutation: {
        //will register a new user that meet some type or prerequisite 
        register: async (_: any, args: registerObject) => {

            let { username, password, email, firstName, lastName, birthday, gender } = args

            const errors: ErrorObject = {}

            try {

            //hash password
                password = await bcrypt.hash(password, SALT);

            //create the user
                const newUser = await User.create({
                    username,
                    password,
                    email,
                    firstName,
                    lastName,
                    birthday,
                    gender
                })

            //return the newly created user
                return newUser

            } catch (err:any) {

                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach((element:any) => {
                    //creating message of errors for anything inside the errors object
                        // handles only one error at a time because the try catch will throw something 
                        // right when the first sequelize duplicate error
                        console.log(typeof element)
                        errors[element.path as keyof typeof errors] = `${element.path} is already taken`
                    });
                }
                
                // throws a new error with appropriate errors
                throw new UserInputError('Bad Input', {errors})
            }
        }
    },
}