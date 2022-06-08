const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const JWT_KEY = "setyjxcvbnuytredb";

module.exports.signupUser = async function signupUser(req, res) {
    try {
        const obj = req.body;
        const user = await userModel.create(obj);
        if (user) {
            res.json({
                message: "signup successful",
                data: user
            })
        }
        else {
            res.json({
                message: "signup failure"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};


module.exports.loginUser = async function loginUser(req, res) {
    try {
        const obj = req.body;
        if (obj.email) {
            user = await userModel.findOne({ email: obj.email });
            if (user) {
                if (obj.password == user.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: "login successful",
                        data: user
                    })
                }
                else {
                    res.json({
                        message: "incorrect credential"
                    })
                }
            }
            else {
                res.json({
                    message: "user not found"
                })
            }
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
};



module.exports.getUser = async function getUser(req, res) {
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        res.json({
            message: "user",
            data: user
        });
    } catch (error) {
        console.log(error.message);
    }
}




module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.id = user._id;
                req.role = user.role;
                next();
            }
            else {
                return res.json({
                    message: "user not verified"
                })
            }
        }
        else {
            return res.json({
                message: "please login"
            })
        }
    }
    catch (error) {
        console.log("error in protect route", error.message);
    }
};



module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.hostname}/resetpassword/${resetToken}`;
        }
        else {
            return res.json({
                message: "user not found"
            })
        }
    } catch (error) {
        console.log("error in forget password", error.message);
    }
};




module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: "password reset successful"
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    } catch (error) {
        res.json({
            message: "password reset unsuccessful",
            data: error.message
        })
    }
}



module.exports.logout = function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"logout successful"
    })
}





module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role) == true){
            next();
        }
        else{
            res.json({
                message:"ur not authorised person"
            })
        }
    }
}