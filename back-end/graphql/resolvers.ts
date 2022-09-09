import { UserInputError } from "apollo-server"

const { User } = require("../models")

const bcrypt = require('bcrypt')
const salt = 10

// object that could consist of different errors that correspond to the user inputs
interface ErrorObject {
    username?: any,
    email?: any,
    password?: any,
    firstName?: any,
    lastName?: any,
    birthday?: any
}

// Type for user inputs 
interface inputsObject {
    username?: string,
    password?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    birthday?: string,
    gender?: string
}


module.exports = {

    Query: {
        // when called, supplies every user in the database
        getUsers: async () => {
            try {
                const error: ErrorObject = {}

                const users = await User.findAll()

                return users

            } catch {
                (err: object) => {
                    console.log(err)
                }
            }
        }
    },

    Mutation: {
        // will register a new user that meet some type or prerequisite 
        register: async (_: any, args: Object) => {

            var { username, password, email, firstName, lastName, birthday, gender }: inputsObject = args

            const errors: ErrorObject = {}

            try {

            //  hash password
                password = await bcrypt.hash(password, salt);

            // create the user
                const newUser = await User.create({
                    username,
                    password,
                    email,
                    firstName,
                    lastName,
                    birthday,
                    gender
                })

            // return the newly created user
                return newUser

            } catch (err:any) {
            // check if the inputs are empty
            // - checking if username of email already exist
            // - check if the user is even old enough to use the application

                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach((element:any) => {
                    // creating message of errors for anything inside the errors object
                        // handles only one error at a time because the try catch will throw when seeing the first sequelize duplicate error
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