const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
userID: String,
displayName: String,
warns: Number,
mutedUntil: Date
});

module.exports = mongoose.model("Users", userSchema);
