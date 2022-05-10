const authModel = require("../model/authModel");
const logInModel = require("../model/logInModel")
postCreate = async (req, res) => {
    const checkUser = await logInModel.find({})

    let posts = checkUser[0].posts

    if (checkUser) {
        if (req.body.name && req.body.price && req.body.text) {
            /* let flag = false
               if(posts) {
                  for(var i = 0 ; i < posts.length ; i++) {
                      if(posts[i].name === req.body.name){
                             flag = true ; 
                            return res.send("post already exist") ; 
                      }
                     
                  }
              }
              
              if(flag === false) {}*/
            res.statusCode = 201;
            let newPost = Math.round(Math.random() * 1000);
            posts.push({
                name: req.body.name,
                price: req.body.price,
                text: req.body.text,
                id: newPost
            })
            checkUser[0].posts = posts
            await logInModel.deleteMany({})
            let usrUpdPost = await new logInModel({ email: checkUser[0].email, password: checkUser[0].password, posts: checkUser[0].posts })
            
            await usrUpdPost.save()
            await authModel.replaceOne({ "email": usrUpdPost.email }, { email: checkUser[0].email, password: checkUser[0].password, posts: checkUser[0].posts })
           res.send("post created Successfully")
        } else {
            res.statusCode = 400;
            res.send("Post Field is missing ");

        }
    }
}
postDel = async (req, res) => {
    const checkUser = await logInModel.find({})
    let posts = checkUser[0].posts
    let flag = false
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === req.body.id) {
            flag = true;
            posts.splice(i, 1)

            await logInModel.replaceOne({ "email": checkUser[0].email }, { email: checkUser[0].email, password: checkUser[0].password, posts: posts })
            await authModel.replaceOne({ "email": checkUser[0].email }, { email: checkUser[0].email, password: checkUser[0].password, posts: posts })
            res.send("post deleted successfully");
        }

    }
}
postUpd = async (req, res) => {
    const checkUser = await logInModel.find({})
    let posts = checkUser[0].posts
    let post = posts.find((post) => post.id === req.body.id) ; 
    if(req.body.updName) {
        post.name = req.body.updName ; 
    } 
    if(req.body.updPrice) {
        post.price = req.body.updPrice
    } 
    if(req.body.updText) {
        post.text = req.body.updText
    } 
    var indexNo = posts.indexOf(post) ; 
    
    posts.splice(indexNo , 1 , post )
   
    await logInModel.replaceOne({ "email": checkUser[0].email }, { email: checkUser[0].email, password: checkUser[0].password, posts: posts })
    await authModel.replaceOne({ "email": checkUser[0].email }, { email: checkUser[0].email, password: checkUser[0].password, posts: posts })
    res.send("post Updated Successfully")
}
postRead = async (req, res) => {
    res.statusCode = 200;
    const checkUser = await logInModel.find({})
    let posts = checkUser[0].posts ; 
    let Post = posts.find((post) => post.id === parseInt(req.params.id))
    if (Post) {
       return res.json(Post)
    } else {
         res.send("Post not found! "  );
    }
}
module.exports = { postCreate , postDel , postUpd , postRead}