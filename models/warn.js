const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  userNickname: String,
  warnReason: String,
  moderatorID: String,
  moderatorNickname: String,
  time: String,
  channeID: String,
  channelName: String,
  warnedVia: String
});


module.export = mongoose.model("Warn", warnSchema);
