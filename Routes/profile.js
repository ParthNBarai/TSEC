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
            budget: req.body.budget,
            aadhar: `${process.env.Book2play_URI}api/image/${req.file.filename}`,
        })

        const saved = await updateProfile.save();
        // console.log(saved);
        res.status(200).json("Updated profile succcessfully!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router