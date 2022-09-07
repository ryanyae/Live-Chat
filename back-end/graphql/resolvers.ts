const { User } = require("../models")

interface ErrorObject {
    username?:String,
    email?:String,
    password?:String
}

module.exports = {

    Query: {
        getUsers: async () => {
            try{
                const error = {}
                
                const users = await User.findAll()

                return users

            }catch{
                (err:object) => {
                    console.log(err)
                }
            }
        }
      },
}