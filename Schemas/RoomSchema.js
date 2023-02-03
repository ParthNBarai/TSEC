const mongoose = require("mongoose");
// console.log(user-icon)
const RoomSchema = mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    startRent: {
        type: Number,
        required: true
    },
    endRent: {
        type: Number,
        required: true
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    images: [{
        type: String,
        required: true
    }],
    area: {
        type: Number,
        required: true
    },
    bhk: {
        type: Number,
        required: true
    },

});



module.exports = mongoose.model('Room', RoomSchema);