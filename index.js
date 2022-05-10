const mongoose = require("mongoose") ; 
const mainRouter = require("./route/index")
const express = require("express") ; 
const app = express() ; 
const PORT = 2000 ; 
const urlParser = express.json() ; 
app.use(urlParser) ; 
app.use(mainRouter) ; 
mongoose.connect("mongodb+srv://Subhan:security12@cluster0.zpzqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" , {
    useNewUrlParser : true , 
    useUnifiedTopology : true 
}) 
mongoose.connection.on("connected" , () => {
    console.log("connected") ; 
})
mongoose.connection.on("error" , (err) => {
    console.log("error" , err)
})
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})