const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const multer = require('../Middleware/multer')
const ProfileSchema = require('../Schemas/ProfileSchema');
const HomeScreenFunctions = require('../Functions/HomeScreenFunctions');
const ProfileMatchSchema = require('../Schemas/ProfileMatchSchema');
const UserSchema = require('../Schemas/UserSchema');
require("dotenv/config");

//Route for profile create
router.post('/create', async (req, res) => {
    try {
        // console.log(req.files)
        const updateProfile = new ProfileSchema({
            phone: req.body.phone,
            name: req.body.name,
            gender: req.body.gender,
            userage: req.body.userage,
            education: {
                pursuing: {
                    stream: req.body.stream,
                    college: req.body.college
                },
                completed: req.body.completed
            },
            work: req.body.work,
            experience: req.body.experience,
            smoking: req.body.smoking,
            oddHabits: req.body.oddHabits,
            genderPref: req.body.genderPref,

            "hobbies.dancing": req.body.dancing,
            "hobbies.singing": req.body.singing,
            "hobbies.painting": req.body.painting,
            "hobbies.music": req.body.music,
            "hobbies.games": req.body.games,
            "hobbies.literature": req.body.literature,
            "hobbies.sports": req.body.sports,

            // budget: req.body.budget,
            // aadhar: `${process.env.Book2play_URI}api/image/${req.files[1].filename}`,
        })

        for (let i = 0; i < req.body.age.length; i++) {
            let reqage = req.body.age[i].split("-");
            // age = parseInt(age)
            // console.log(reqage)
            const newage = {
                startAge: parseInt(reqage[0]),
                endAge: parseInt(reqage[1])
            }
            updateProfile.preferences.age[i] = newage;
        }

        for (let i = 0; i < req.body.genderPref.length; i++) {
            updateProfile.preferences.gender.push(req.body.genderPref[i]);
        }

        for (let i = 0; i < req.body.food.length; i++) {
            updateProfile.preferences.food.push(req.body.food[i]);
        }

        for (let i = 0; i < req.body.rate.length; i++) {
            // let reqage = req.body.rate[i].split("-");
            // // age = parseInt(age)
            // // console.log(reqage)
            // const newrate = {
            //     startRate: parseInt(reqage[0]),
            //     endRate: parseInt(reqage[1])
            // }
            // updateProfile.preferences.rate[i] = newrate;
            updateProfile.preferences.rate.push(req.body.rate[i]);
        }
        const saved = await updateProfile.save();

        // const newAvatar = {
        //     $set: {
        //         avatar: `${process.env.Book2play_URI}api/image/${req.files[0].filename}`
        //     }
        // }

        // const updateUser = await UserSchema.updateOne({ phone: req.body.phone }, newAvatar)
        // console.log(saved);
        HomeScreenFunctions.MatchProfile(req, res, saved)
        res.status(200).json("Updated profile succcessfully!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})


router.post('/get', fetchuser, async (req, res) => {
    try {
        const matches = await ProfileMatchSchema.find({ user1phone: req.user.phone })
        const matches2 = await ProfileMatchSchema.find({ user2phone: req.user.phone })

        res.status(200).json(matches.push(matches2))
    } catch (error) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})
module.exports = router