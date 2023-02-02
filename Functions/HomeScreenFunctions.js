const RoomSchema = require("../Schemas/RoomSchema");

async function RateSort(req, res) {
    try {
	const roomRates = await RoomSchema.find().sort({ startRent: 1 })
	    console.log(roomRates)
} catch (err) {
	
}
}

// RateSort(req,res)

module.exports = { RateSort }