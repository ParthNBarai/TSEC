const mongoose = require("mongoose");
// console.log(user-icon)
const userSchema = mongoose.Schema({
    
    email:{
        type : String,
    },
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        // required: true
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
    avatar: {
        type: String,
        default: 'https://book2play.el.r.appspot.com/api/image/profile_icon.png_1659857137964parthnb@gmail.com.png'
    },
   
});



module.exports = mongoose.model('User', userSchema);