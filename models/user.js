const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
userID: String,
displayName: String,
warns: Number,
mutedUntil: Date
});

module.exports = mongoose.model("Users", userSchema);
