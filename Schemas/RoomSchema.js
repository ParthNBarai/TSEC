const mongoose = require("mongoose");
// console.log(user-icon)
const RoomSchema = mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    rent: {
        type: String,
        required: true
    },
    address: [{
        flatNo: {
            type: String,
            required: true
        },
        buildingName: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        area: {
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
    }],
    ownerPhone: {
        type: String,
        required: true
    }


});



module.exports = mongoose.model('Room', RoomSchema);