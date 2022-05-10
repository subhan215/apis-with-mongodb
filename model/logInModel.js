const mongoose = require("mongoose")
const logInSchema = mongoose.Schema({
    email : {
        type : String
    } , 
    password : {
        type : String
    } , 
    posts : {
        type : Array
        
    }
})
const logInModel = mongoose.model( "logInData", logInSchema)
module.exports = logInModel