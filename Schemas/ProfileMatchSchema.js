const mongoose = require('mongoose')

const MatchPairSchema = mongoose.Schema({
    user1Phone: {
        type: String,
        required: true
    },
    user2Phone: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Matches', MatchPairSchema);