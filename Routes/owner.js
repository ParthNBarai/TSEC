const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const auth = require('../Authentication/GetBearerToken')
const OwnerSchema = require('../Schemas/OwnerSchema');
const multer = require('../Middleware/multer')
require("dotenv/config");

router.post('/signup', multer.upload.single('image'), body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
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
                const newOwner = new OwnerSchema({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    phone: req.body.phone,
                    device_id: req.body.device_id,
                    user_id: req.body.user_id,
                    aadhar: `${process.env.Book2play_URI}api/image/${req.file.filename}`,
                })

                const saved = await newOwner.save();
                // console.log(saved)
                res.status(200).json("Signup Successfull!")
            }
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message });

        }
    })


router.post('/login',
    body('phone', 'Enter a valid phone number').isLength({ min: 13, max: 13 }),
    // body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    // body('email', 'Enter a valid Email').isEmail()
    async (req, res) => {
        try {
            var valerr = validationResult(req);
            if (!valerr.isEmpty()) {
                console.log(valerr.mapped())
                res.status(401).json(valerr)
            }
            else {

                // const user = { phone: req.body.phone };
                const user = await OwnerSchema.findOne({ phone: req.body.phone })
                if (!user) {
                    res.status(400).json("Signup!")
                }
                else {

                    const newUser = {
                        id: user.id,
                        phone: user.phone,
                        name: user.name,
                        device_id: user.device_id
                    }
                    // console.log(newUser)
                    const jsontoken = await auth.tokenGenerate(req, res, newUser);


                    return res.status(200).json({
                        success: 1,
                        message: "Successful login!",
                        token: jsontoken,
                    })

                }
            }

        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message });
        }
    })

module.exports = router