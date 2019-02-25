const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: Number,
  userNickname: String,
  warnReason: String,
  moderatorID: Number,
  moderatorNickname: String,
  when: String,
  channeID: Number,
  channelName: String,
  numberWarnings: Number
});

module.exports = mongoose.model("Warn", warnSchema);
