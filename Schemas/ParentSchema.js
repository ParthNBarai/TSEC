const mongoose = require("mongoose");
// console.log(user-icon)
const ParentSchema = mongoose.Schema({

    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    device_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    childName: {
        type: String,
        // required: true
    },

});



module.exports = mongoose.model('Parents', ParentSchema);