const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require("./botconfig.json");
const modRoles = botconfig.modRoles;
const logChannel= botconfig.logChannel;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATA_LOGINS);
var Warn = require('./../models/warn.js');
var User = require('./../models/user.js');


function getRoles(role, index){
  console.log("Role: " + role.name);
  var rolename = role.name;
  return rolename;
}

module.exports.run = async (bot, message, args) => {

  var rolesArray = message.member.roles.map(id => id.id);

  var user_obj = User.findOne({
		userID: message.member.id
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (foundObj === null){
				var myData = new User({
					userID: message.member.id,
					displayName: message.member.displayName,
					joinedAt: message.member.joinedAt,
					messages: 1,
					warns: 0,
					lastScan: Date.now()
				});
				myData.save()
				.then(item => {
					console.log('New user "' + message.member.displayName + '" added to database');
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});
			}
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					foundObj.mainmessages++;
					var dateTime = Date.now();
					var timestamp = Math.floor(dateTime/1000);
					var timestampLimit = Math.floor(foundObj.lastScan/1000) + 60;
					if (timestampLimit < timestamp) {

						// var userRoles = message.member.roles.array(getRoles);
						// console.log("Роли")
						// console.log("Roles: " + message.member.roles.array(role => console.log(role.name)))

						var min = 1;
						var max = 15;
						var coinrandom = Math.floor(Math.random() * (max - min + 1)) + min;
						foundObj.messages++;
						foundObj.displayName = message.member.displayName;
						foundObj.roles = rolesArray;
						foundObj.lastScan = Date.now();
						foundObj.save(function(err, updatedObj){
							if(err)
								console.log(err);
						})
					}
				}
			}
		}
	});


  }
