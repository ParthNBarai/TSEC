const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const auth = require('../Authentication/GetBearerToken')
const UserSchema = require('../Schemas/UserSchema');
const multer = require('../Middleware/multer');
require("dotenv/config");

//Route for user signup : /api/v1/user/signup
router.post('/signup', multer.upload.single('image'),
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('phone', 'Enter a valid phone number').isLength({ min: 13, max: 13 }),
    body('email', 'Enter a valid email').isEmail(), async (req, res) => {
        try {

            var valerr = validationResult(req);
            if (!valerr.isEmpty()) {
                console.log(valerr.mapped())
                res.status(401).json(valerr)
            }
            else {
                const userFind = await UserSchema.findOne({ phone: req.body.phone });

                if (userFind) {
                    const User = {
                        id: userFind.id,
                        phone: userFind.phone,
                        name: userFind.name,
                        device_id: userFind.device_id
                    }
                    const refresh = sign({ result: User }, process.env.Refresh_token_id)
                    const jsontoken = await auth.tokenGenerate(req, res, User);
                    return res.status(200).json({
                        success: 1,
                        message: "Existing!",
                        token: jsontoken,
                    });
                }
                else {

                    // console.log(err)
                    const salt = genSaltSync(10);
                    req.body.password = hashSync(req.body.password, salt);
                    const newUser = new UserSchema({
                        phone: req.body.phone,
                        password: req.body.password,
                        name: req.body.name,
                        device_id: req.body.device_id,
                        user_id: req.body.user_id,
                        email: req.body.email,
                        avatar: req.body.image ? `${process.env.Book2play_URI}api/image/${req.file.filename}` : `${process.env.Book2play_URI}api/image/user-icon.png_1675325102044parth@gmail.com.png`
                    })



                    const saved = await newUser.save();
                    // console.log(saved)
                    // console.log(saved.id)
                    const User = {
                        id: saved.id,
                        phone: newUser.phone,
                        name: newUser.name,
                        device_id: newUser.device_id
                    }
                    const refresh = sign({ result: newUser }, process.env.Refresh_token_id)
                    const jsontoken = await auth.tokenGenerate(req, res, User);
                    return res.status(200).json({
                        success: 1,
                        message: "Successful signup",
                        token: jsontoken,
                    });
                }
            }
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        }
    })


//Route for user login : /api/v1/user/login
router.post('/login',
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    // body('email', 'Enter a valid Email').isEmail()
    async (req, res) => {
        try {
            var valerr = validationResult(req);
            if (!valerr.isEmpty()) {
                console.log(valerr.mapped())
                res.status(401).json(valerr)
            }
            else {

                const user = { phone: req.body.phone };
                UserSchema.findOne({ phone: req.body.phone })
                    .exec()
                    .then(async user => {
                        // console.log(user)
                        if (!user) {
                            return res.status(403).json({
                                error: {
                                    message: "User Not Found, Kindly Register!"
                                }
                            })
                        }

                        else {
                            const result = compareSync(req.body.password, user.password);
                            if (result) {
                                user.password = undefined;
                                const newUser = {
                                    id: user.id,
                                    phone: user.phone,
                                    name: user.name,
                                    device_id: user.device_id
                                }
                                // console.log(newUser)
                                const jsontoken = await auth.tokenGenerate(req, res, newUser);

                                // console.log("refresh")
                                // console.log(refresh)

                                return res.status(200).json({
                                    success: 1,
                                    message: "Successful login!",
                                    token: jsontoken,

                                });
                            }
                            else {
                                // console.log(err.message)
                                return res.status(403).json({
                                    error: {
                                        message: "Username or Password Invalid!"
                                    }
                                })
                            }

                        }

                    })
            }

        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        }
    })

module.exports = router

