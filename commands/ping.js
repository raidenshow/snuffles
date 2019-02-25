const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("понг!");
}

module.exports.help = {
  name: "ping"
}
