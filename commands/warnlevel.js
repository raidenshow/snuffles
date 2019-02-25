const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
var Warn = require('./../models/warn.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect(process.env.DATA_LOGINS, { useNewUrlParser: true });

module.exports.run = async (bot, message, args) => {
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.reply("Нет такого челика :(");

  var user_obj = Warn.findOne({
      userID: wUser.id
    }, async function (err, foundObj) {
      if (err)
        console.log("Error on database findOne: " + err);
      else {
        if (!foundObj)
          console.log("Something stange happend");
        else {
          var numberWarnings = user_obj.numberWarnings;
          message.reply(`<@${wUser.id}> получил ${numberWarnings} предупреждений.`);

       }
      }
    });
}

module.exports.help = {
  name: "варны"
}
