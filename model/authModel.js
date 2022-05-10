const mongoose = require("mongoose") ; 

const authSignupSchema = mongoose.Schema({
    email : {
        type : String
    } , 
    password : {
        type : String
    } , 
    posts : {
        type : Array ,
        
    }
})

const authModel = mongoose.model( "authData", authSignupSchema)
module.exports = authModel  ;  