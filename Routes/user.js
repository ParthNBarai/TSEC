const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const auth = require('../Authentication/GetBearerToken')
const UserSchema = require('../Schemas/UserSchema');
const HomeScreenFunctions = require('../Functions/HomeScreenFunctions')
const multer = require('../Middleware/multer');
const RoomSchema = require('../Schemas/RoomSchema');
const e = require('express');
require("dotenv/config");

//Route for user signup : /api/v1/user/signup
router.post('/signup', multer.upload.single('image'),
    body('phone', 'Enter a valid phone number').isLength({ min: 13, max: 13 }), async (req, res) => {
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
                        // name: userFind.name,
                        // device_id: userFind.device_id
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
                    // const salt = genSaltSync(10);
                    // req.body.password = hashSync(req.body.password, salt);
                    const newUser = new UserSchema({
                        phone: req.body.phone,
                        // password: req.body.password,
                        // name: req.body.name,
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
                        // name: newUser.name,
                        // device_id: newUser.device_id
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
                const user = await UserSchema.findOne({ phone: req.body.phone })
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


router.get('/rate/filter', async (req, res) => {
    try {
        const roomRates = await RoomSchema.find().sort({ startRent: 1 })
        res.status(200).json(roomRates);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})


router.get('/area/filter', async (req, res) => {
    try {
        const roomRates = await RoomSchema.find().sort({ area: 1 })
        res.status(200).json(roomRates);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

router.get('/bhk/filter', async (req, res) => {
    try {
        const roomRates = await RoomSchema.find().sort({ bhk: 1 })
        res.status(200).json(roomRates);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})


//Route for finding a venue : /api/v1/venue/find/venue
router.post("/find/room", async (req, res) => {
    try {
        const roomSearch = await RoomSchema.find({ $or: [{ name: { $regex: `${req.body.name}`, $options: 'i' } }, { "address.city": { $regex: `${req.body.address}`, $options: 'i' } }, { "address.pincode": { $regex: `${req.body.address}`, $options: 'i' } }, { "address.state": { $regex: `${req.body.address}`, $options: 'i' } }, { "address.addressLine1": { $regex: `${req.body.address}`, $options: 'i' } }, { "address.addressLine2": { $regex: `${req.body.address}`, $options: 'i' } }] });
        res.status(200).json(roomSearch);
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
});
module.exports = router

