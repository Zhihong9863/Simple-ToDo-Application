const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
//Export model
module.exports = mongoose.model("User", UserSchema);

/**
 * {
 * "_id":{"$Objectid":"655b480961958211de346357"},
 * "username":"zhe17@depaul.edu",
 * "password":"$2b$10$blFAukpzXm9hHymg4tW3Sue8Twee/TzUZvIcA9x0thCa.gOi0aMxa",
 * "posts":[],"__v":{"$numberInt":"0"}
 * }
 */