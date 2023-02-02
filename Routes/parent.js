const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const auth = require('../Authentication/GetBearerToken')
const ParentSchema = require('../Schemas/ParentSchema');
require("dotenv/config");

router.post('/signup', body('name', 'Enter a valid Name').isLength({ min: 3 }),
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
                const salt = genSaltSync(10);
                req.body.password = hashSync(req.body.password, salt);
                const newParent = new ParentSchema({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    phone: req.body.phone,
                    device_id: req.body.device_id,
                    user_id: req.body.user_id,
                    childName: req.body.childName,
                })


                const saved = await newParent.save()
                // console.log(saved)
                res.status(200).json("Signup Success!")
            }
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        }

    })


router.post('/login',
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }), async (req, res) => {
        try {
            var valerr = validationResult(req);
            if (!valerr.isEmpty()) {
                console.log(valerr.mapped())
                res.status(401).json(valerr)
            }
            else {

                const user = { phone: req.body.phone };
                ParentSchema.findOne({ phone: req.body.phone })
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