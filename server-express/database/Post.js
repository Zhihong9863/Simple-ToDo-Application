const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  completedDate: { type: Date },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});
//Export model
module.exports = mongoose.model("Post", PostSchema);

/**
 * {
 * "_id":{"$Objectid":"655be3fb771b89d06456b53f"},
 * "title":"example title",
 * "content":"example content",
 * "createdDate":{"$date":{"$numberLong":"1700445600000"}},
 * "isCompleted":true,
 * "completedDate":{"$date":{"$numberLong":"1700446200000"}},
 * "author":{"$Objectid":"655bc0a0584aacac22c90059"},
 * "__v":{"$numberInt":"0"}
 * }
 */