const express = require('express')
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const ParentSchema = require('../Schemas/ParentSchema');


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

module.exports = router