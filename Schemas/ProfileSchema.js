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
    dob: {
        type: Date,
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
        required: true
    },
    oddHabits: {
        type: Array,
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
            startRate: {
                type: Number,
                // required:true
            },
            endRate: {
                type: Number,
                // required:true
            }
        }],

    },
    hobbies: {
        dancing: {
            type: Boolean,
            default: false
        },
        singing: {
            type: Boolean,
            default: false
        },
        painting: {
            type: Boolean,
            default: false
        },
        music: {
            type: Boolean,
            default: false
        },
        games: {
            type: Boolean,
            default: false
        },
        literature: {
            type: Boolean,
            default: false
        },
        sports: {
            type: Boolean,
            default: false
        },

    },

    aadhar: {
        type: String,
        required: true
    }


});



module.exports = mongoose.model('Profile', ProfileSchema);