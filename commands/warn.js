const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATA_LOGINS);
var Warn = require('./../models/warn.js');
var User = require('./../models/user.js');


module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS"))
  return message.reply("Так могут только модеры и админы :)");

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.reply("Нет такого челика...");
  if(wUser.hasPermission("MANAGE_MESSAGES"))
  return message.reply("Этого челика варнить нельзя...");
  let wreason = args.join(" ").slice(22);
  if (!wreason)
  return message.reply("ты забыл указать причину!(пидор)")

  var myData = new Warn({
      userID: wUser.id,
      userNickname: wUser.displayName,
      warnReason: wreason,
      moderatorID: message.member.id,
      moderatorNickname: message.member.displayName,
      when: Date.now(),
      channelID: message.channel.id,
      channelName: message.channel.name
    });
				myData.save()
				.then(item => {
					console.log('Warn from"' + message.member.displayName);
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});

        var user_obj = User.findOne({
        		userID: wUser.id
        	}, function (err, foundObj) {
        		if (err)
        			console.log("Error on database findOne: " + err);
        		else {
        			if (foundObj === null){
                  var myData = new Warn({
                    userID: wUser.id,
                    displayName: wUser.displayName,
                    warns: 1
                  });
                  myData.save()
          				.then(item => {
          					console.log('Warn from"' + message.member.displayName);
          				})
          				.catch(err => {
          					console.log("Error on database save: " + err);
          				});
                }else{
                  if (foundObj.warns == null || typeof foundObj.warns == "undefined")
                   foundObj.warns = 1;
                  else
                  foundObj.warns = foundObj.warns + 1;
                  foundObj.save()
                  .then(item => {
                    console.log('Warn to"' + message.member.displayName);
                  })
                  .catch(err => {
                    console.log("Error on database save: " + err);
                  });
                  var newWarns = foundObj.warns;

                  let warnEmbed = new Discord.RichEmbed()
                  .setDescription("Warns")
                  .setAuthor(message.author.username)
                  .setColor("#fc6400")
                  .addField("Warned User", `<@${wUser.id}>`)
                  .addField("Warned In", message.channel)
                  .addField("Number of Warnings", foundObj.warns)
                  .addField("Reason", wreason);


  let warnchannel = message.guild.channels.find(channel => channel.name === "log");
  if(!warnchannel) return message.reply("Не могу найти лог чат");

  warnchannel.send(warnEmbed);

  if(newWarns == 1){
        message.channel.send(`<@${wUser.id}>` + " получил свое первое предупреждение! Не нарушай больше!");
      }
      else{
        switch (newWarns) {
          case 2:
            mutetime = "5m";
            break;
          case 3:
            mutetime = "10m";
          case 4:
            mutetime = "20m";
          default:
            mutetime = "30m";


            var user_obj = User.findOne({
                userID: wUser.id
              }, function (err, foundObj) {

              var timestamp = new Date().getTime();
              var mutedUntil = new Date();

              mutedUntil.setTime(timestamp + ms(mutetime));

              foundObj.mutedUntil = mutedUntil;
              foundObj.save(function(err, updatedObj){
                if(err)
                  console.log(err);
                });
              });
              wUser.addRole(muterole.id);
              message.channel.send(`<@${wUser.id}>` + " посидит " + mutetime + ",  подумает...");

              setTimeout(function(){
                if(wUser.roles.has(muterole.id)){
                  wUser.removeRole(muterole.id);
                  warnchannel.send(`<@${wUser.id}> был размучен!`);
                }
              }, ms(mutetime));
        }
      }
    }
  }
  });
        }


module.exports.help = {
  name: "варн"
}
