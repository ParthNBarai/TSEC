const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const multer = require('../Middleware/multer')
const ProfileSchema = require('../Schemas/ProfileSchema');
require("dotenv/config");

//Route for profile create
router.post('/create', multer.upload.single('image'), async (req, res) => {
    try {
        console.log("dfdfd")
        const updateProfile = new ProfileSchema({
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
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
            hobbies: {
                dancing: req.body.dancing,
                singing: req.body.singing,
                painting: req.body.painting,
                music: req.body.music,
                games: req.body.games,
                literature: req.body.literature,
                sports: req.body.sports,
            },
            // budget: req.body.budget,
            aadhar: `${process.env.Book2play_URI}api/image/${req.file.filename}`,
        })

        for (let i = 0; i < req.body.age.length; i++) {
            let reqage = req.body.age[i].split("-");
            // age = parseInt(age)
            // console.log(reqage)
            const newage = {
                startAge: parseInt(reqage[0]),
                endAge: parseInt(reqage[1])
            }
            updateProfile.preferences.age[i]= newage;
        }
        
        for (let i = 0; i < req.body.genderPref.length; i++) {
            updateProfile.preferences.gender.push(req.body.genderPref[i]);
        }
        
        for (let i = 0; i < req.body.food.length; i++) {
            updateProfile.preferences.food.push(req.body.food[i]);
        }
        
        for (let i = 0; i < req.body.rate.length; i++) {
            let reqage = req.body.rate[i].split("-");
            // age = parseInt(age)
            // console.log(reqage)
            const newrate = {
                startRate: parseInt(reqage[0]),
                endRate: parseInt(reqage[1])
            }
            updateProfile.preferences.rate[i]= newrate;
        }
        const saved = await updateProfile.save();

        
        // console.log(saved);
        res.status(200).json("Updated profile succcessfully!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router