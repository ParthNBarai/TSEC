const mongoose = require("mongoose");
// console.log(user-icon)
const ProfileSchema = mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userage: {
        type: Number,
        required: true
    },
    education: {
        pursuing: {
            stream: {
                type: String,
                // required: true
            },
            college: {
                type: String,
                // required: true
            }
        },
        completed: {
            type: String,
            // required: true
        }

    },
    work: {
        type: String,
        // required: true
    },
    experience: {
        type: String,
        // required: true
    },
    smoking: {
        type: Boolean,
        // required: true
    },
    oddHabits: {
        type: String,
    },
    preferences: {
        age: [{
            startAge: {
                type: Number,
                // required:true
                default: 18
            },
            endAge: {
                type: Number,
                // required:true
                default: 25
            }
        }],
        gender: [{
            type: String
        }],
        food: [{
            type: String
        }],
        rate: [{
            type: String
        }],

    },
    hobbies: {
        dancing: {
            type: String,
            default: "false"
        },
        singing: {
            type: String,
            default: "false"
        },
        painting: {
            type: String,
            default: "false"
        },
        music: {
            type: String,
            default: "false"
        },
        games: {
            type: String,
            default: "false"
        },
        literature: {
            type: String,
            default: "false"
        },
        sports: {
            type: String,
            default: "false"
        },

    },

    aadhar: {
        type: String,
        // required: true
    }


});



module.exports = mongoose.model('Profile', ProfileSchema);