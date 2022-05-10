const express = require("express") ; 
const router = express.Router() ; 
const authCon = require("../controller/authController") ; 
const postCon = require("../controller/postController")

router.post("/signup" , authCon.authSignup)
router.get("/login" , authCon.authlogIn)
router.post("/post_Create" , postCon.postCreate)
router.delete("/post_Del" , postCon.postDel)
router.put("/post_Upd" , postCon.postUpd)
router.get("/post_Read/:id" , postCon.postRead)
router.delete("/logout" , authCon.authLogOut)
; 
module.exports = router