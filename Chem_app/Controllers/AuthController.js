const User = require("../Models/User")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")
const rend = require ("../server")

const loginbool = false

const register = (req, res, next) => {
  

    let user = new User ({
        name: req.body.name,
        password: req.body.password
    })

    user.save()
    .then(user => {
        res.json({
            message: "User Added"

        })
    })
    .catch (error => {
        res.json({
            message: "Error"
        })
    })  
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    
    User.findOne(username)
    .then(user => {
        if(user){
 
                if(user.name == password) {
                    let token = jwt.sign({name: user.name}, 'SecretValue', {expiresIn: "1h"})
                    res.json({
                        message: "Login Successful!",
                        token,
                    })
                    loginbool = true
                }else {
                    res.json ({
                        message: "Incorrect Password"
                    })
                }
            }
        else{
            res.json({
                message: "No user found."
            })
        }
    })
    .catch (error => {
        res.json({
            message: "Error"
        })
    })  
}

module.exports = { register, login}
