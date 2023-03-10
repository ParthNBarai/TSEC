const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const multer = require('../Middleware/multer');
const RoomSchema = require('../Schemas/RoomSchema');
require("dotenv/config");

router.post('/add', multer.upload.array('images', 5), async (req, res) => {
    try {
        let bhk = req.body.bhk
        bhk = bhk.charAt(0);
        const rates = req.body.rent.split("-")
        // console.log(rates[0])
        const newRoom = new RoomSchema({
            phone: req.body.phone,
            gender: req.body.gender,
            startRent: rates[0],
            endRent: rates[1],
            address: {
                addressLine1: req.body.line1,
                addressLine2: req.body.line2,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            },
            area: req.body.area,
            bhk: parseInt(bhk)


        })
        // console.log(req.files)
        for (i = 0; i < req.files.length; i++) {
            newRoom.images.push(`${process.env.Book2play_URI}api/image/${req.files[i].filename}`);
        }
        const saved = await newRoom.save();
        // console.log(saved)
        res.status(200).json("Room added!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})


router.get('/get', async (req, res) => {
    try {
        const rooms = await RoomSchema.find()
        res.status(200).json(rooms)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})
module.exports = router