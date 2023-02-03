const ProfileMatchSchema = require("../Schemas/ProfileMatchSchema");
const ProfileSchema = require("../Schemas/ProfileSchema");
const RoomSchema = require("../Schemas/RoomSchema");

async function MatchProfile(req, res, saved) {
	try {
		// console.log('savedd')
		const profiles = await ProfileSchema.find();
		// console.log(profiles.length)
		for (let i = 0; i < profiles.length; i++) {
			// for (let j = 0; j < 13; j++) {
			let pts = 0;
			let j = 0;
			if (saved.gender == profiles[i].gender) {
				// console.log("inside gender")
				pts += 5;
			}
			if (saved.age - profiles[i].age <= 3 && profiles[i].age - saved.age >= -3) {
				// console.log("inside age")
				pts += 5;
			}
			if (saved.education.pursuing.stream == profiles[i].education.pursuing.stream) {
				// console.log("inside stream")
				pts += 5;
			}
			if (saved.education.pursuing.college == profiles[i].education.pursuing.college) {
				// console.log("inside college")
				pts += 5;
			}
			if (saved.smoking == profiles[i].smoking) {
				// console.log("inside smok")
				pts += 5;
			}
			// console.log(profiles[i].preferences.age)
			if (profiles[i].preferences.age[j].startAge < saved.preferences.age[j].startAge < profiles[i].preferences.age[j].endAge && saved.preferences.age[j].startAge < profiles[i].preferences.age[j].endAge < saved.preferences.age[j].endAge) {
				// console.log("inside agepref")
				pts += 5;
			}

			if (profiles[i].preferences.age[j].startAge < saved.preferences.age[j].endAge < profiles[i].preferences.age[j].endAge && saved.preferences.age[j].startAge < profiles[i].preferences.age[j].startAge < saved.preferences.age[j].endAge) {
				// console.log("inside agree")
				pts += 5;
			}
			let genderForSave = saved.preferences.gender.sort()
			let genderForProfile = profiles[i].preferences.gender.sort()
			// console.log(genderForProfile)
			// console.log(genderForSave)
			for (let index = 0; index < genderForSave.length || index < genderForProfile.length; index++) {
				// console.log("inside gender equality")
				if (genderForSave[index] == genderForProfile[index]) {
					pts += 5;
				}
			}

			let foodForSave = saved.preferences.food.sort()
			let foodForProfile = profiles[i].preferences.food.sort()
			// console.log(foodForSave)
			// console.log(foodForProfile)
			for (let index = 0; index < foodForProfile.length || index < foodForSave.length; index++) {
				// console.log("inside food")
				if (foodForProfile[index] == foodForSave[index]) {
					pts += 5;
				}
			}

			for (let k = 0; k < saved.preferences.rate.length || k < profiles[i].preferences.rate.length; k++) {
				if (profiles[i].preferences.rate.includes(saved.preferences.rate[k])) {
					// console.log("inside rates")
					pts += 5;
				}
			}


			if (saved.hobbies.dancing == profiles[i].hobbies.dancing) {
				pts += 5;
			}
			if (saved.hobbies.singing == profiles[i].hobbies.singing) {
				pts += 5;
			}
			if (saved.hobbies.painting == profiles[i].hobbies.painting) {
				pts += 5;
			}
			if (saved.hobbies.music == profiles[i].hobbies.music) {
				pts += 5;
			}
			if (saved.hobbies.games == profiles[i].hobbies.games) {
				pts += 5;
			}
			if (saved.hobbies.literature == profiles[i].hobbies.literature) {
				pts += 5;
			}
			if (saved.hobbies.sports == profiles[i].hobbies.sports) {
				pts += 5;
			}

			const newMatch = new ProfileMatchSchema({
				user1Phone: profiles[i].phone,
				user2Phone: saved.phone,
				percentage: pts,
			})
			// console.log(pts)
			const savednew = await newMatch.save();
			// console.log(savednew)
		}
		// }
	} catch (err) {
		console.log(err)
	}
}

// RateSort(req,res)

module.exports = { MatchProfile }