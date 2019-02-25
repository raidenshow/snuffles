const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: Number,
  userNickname: String,
  warnReason: String,
  moderatorID: Number,
  moderatorNickname: String,
  when: Date,
  channelID: Number,
  channelName: String
});

module.exports = mongoose.model("Warn", warnSchema);
