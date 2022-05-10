const authModel = require("../model/authModel");
const logInModel = require("../model/logInModel")
const bcrypt = require("bcryptjs");
authSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await authModel.findOne({ "email": email })
        if (checkUser) {
            return res.status(200).send({ success: false, message: "user already registered" })
        } else {
            const hashPass = await bcrypt.hash(password, 12);
            const userCreate = await new authModel({ email, password: hashPass, posts: [] })
            await userCreate.save()
                .then(() => {
                    return res.status(200).send({ success: true, message: "successfully registered" })
                })
                .catch((err) => {
                    return res.status(400).send({ success: false, message: err.message })
                })
        }
    }
    catch (err) {
        return res.status(401).send({ success: false, message: err.message })
    }
}
authlogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await authModel.findOne({ "email": email })
        
        if (checkUser) {


            await bcrypt.compare(password, checkUser.password, (err, isMatch) => {
                if (err) {
                    throw err
                } else if (!isMatch) {
                    return res.status(403).send({ success: false, message: "Wrong Password" })
                } else if (isMatch) {
                    const userCreate = new logInModel({ email, password: checkUser.password, posts: checkUser.posts })
                    userCreate.save()
                    return res.status(200).send({ success: true, message: "Successfully Login", user: email })
                }
            })
        } else {
            return res.status(404).send({ success: false, message: "User doesn't exist" })
        }

    }
    catch (err) {
        return res.status(401).send({ success: false, message: err.message })

    }
}
authLogOut = async (req, res) => {
    await logInModel.deleteMany({}) ; 
    res.send("User Logout Successfully!") ; 
}

module.exports = { authSignup, authlogIn , authLogOut}