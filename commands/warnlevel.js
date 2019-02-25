const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var User = require('./../models/user.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect(process.env.DATA_LOGINS, { useNewUrlParser: true });

module.exports.run = async (bot, message, args) => {
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!wUser) return message.reply("Нет такого челика :(");

  var user_obj = User.findOne({
      userID: wUser.id
    }, async function (err, foundObj) {
      if (err)
        console.log("Error on database findOne: " + err);
      else {
        if (!foundObj)
          console.log("Something stange happend");
        else {
          var warnings = foundObj.warns;
          console.log(warnings);
          message.reply(`<@${wUser.id}> получил ${warnings} предупреждений.`);

       }
      }
    });
}

module.exports.help = {
  name: "варны"
}
