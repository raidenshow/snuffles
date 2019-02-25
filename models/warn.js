const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  userNickname: String,
  warnReason: String,
  moderatorID: String,
  moderatorNickname: String,
  when: String,
  channeID: String,
  channelName: String,
  warnedVia: String
});

module.exports = mongoose.model("Warn", warnSchema);