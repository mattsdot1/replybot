const Discord = require("discord.js");
const fs = require("fs");
let cooldowns = JSON.parse(fs.readFileSync('cooldown.json','utf-8'));
let cdlimit = 5000;
//const ytdl = require("ytdl-core");
//const request = require("request");
//const fs = require("fs");
//const getytid = require("get-youtube-id");
//const fvi = require("youtube-info");

//var config = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));
//const apikey = config.yt_api_key;

const prefix = "?";

var args;
var men;
var sname = "";
var defrole ="Members";
var mod;
args = null;

const token = "NDIyODk3MTU1NzA4MDI2ODgx.DdOudA.XctvfYHOj8MuqguxVFxhr8xg-mY" ;

var bot = new Discord.Client();

var queue = [];
var isPlaying = false;
var dispatcher =  null;
var vC = null;
var skipReq = 0;
var skippers = [];

var hellorep = [
 "Hello there, ",
 "How You Doin'? ",
 "Wassuppppp ",
 "Hi, ",
 "Hello, ",
 "Hey, ",
 "Yo, "];

var balls = [
    "***Yes!***",
    "**No Way!**",
    "*Maybe or Maybe not... xd*",
    "**Are you Serious?**",
    "*Probably...*",
    "*I don't think so...*",
	"**OF COURSE**",
	"**TBH, I have no clue**",
	"**Hell Yea!**",
	"**Heck To The No**"
];

 var byerep = [
  "Bye, ",
  "Cya, ",
  ":wave:, ",
  "Goodbye ",
  "Good Goodbye ",
  "R.I.P. "];

  var wasuprep = [
	  "Fine, How bout you???",
	  "I 'm good, Thank You!",
	  "Waaaazzzzuuuuupppp!",
  ];

var memelist = [
 " http://i0.kym-cdn.com/photos/images/original/001/327/454/63b.jpg",
 " http://i0.kym-cdn.com/photos/images/original/001/346/356/d7a.png",
 " http://i0.kym-cdn.com/photos/images/original/000/583/102/811.gif",
 " http://i0.kym-cdn.com/photos/images/original/000/583/202/087.png",
 " http://i0.kym-cdn.com/entries/icons/original/000/025/347/19554677_1448397055271494_779624093138699636_n.jpg",
 " http://i0.kym-cdn.com/entries/icons/original/000/021/342/describe_yourself_in_3_characters.jpg",
 " http://i0.kym-cdn.com/photos/images/original/001/248/160/6d4.png",
 " http://i0.kym-cdn.com/photos/images/original/001/231/886/8c3.jpg",
 " http://i0.kym-cdn.com/photos/images/original/000/345/939/146.png",
 " http://images.memes.com/meme/15876.jpg",
 " http://images.memes.com/meme/2323.jpg",
 " http://images.memes.com/meme/17592.jpg",
 " http://images.memes.com/meme/442.jpg",
 " http://images.memes.com/meme/1157.jpg",
 " http://images.memes.com/meme/16030.jpg",
 " http://images.memes.com/meme/18226.jpg",
 " https://cdn.discordapp.com/attachments/418300650569465866/418312962143682560/12a96e676a15aa0a0784f47998b5df61--grumpy-cat-meme-cat-memes.jpg",
 " https://cdn.discordapp.com/attachments/417007228873343007/417820917415149569/image.jpg",
 "http://images.memes.com/meme/27166.jpg",
 "http://images.memes.com/meme/27178.jpg",
 "http://images.memes.com/meme/29278.jpg",
 "http://images.memes.com/meme/29268.jpg",
 "http://images.memes.com/meme/29234.jpg",
 "http://images.memes.com/meme/15234.jpg",
 "http://images.memes.com/meme/15334.jpg",
 "http://images.memes.com/meme/15354.jpg",
 "http://images.memes.com/meme/16557.jpg",
 "http://images.memes.com/meme/16577.jpg",
 "http://images.memes.com/meme/17577.jpg",
 "http://images.memes.com/meme/17437.jpg",
 "http://images.memes.com/meme/11237.jpg",
 "http://images.memes.com/meme/14217.jpg",
 "http://images.memes.com/meme/14217.jpg",
 "http://images.memes.com/meme/24114.jpg",
 "http://images.memes.com/meme/24104.jpg",
 "http://images.memes.com/meme/23204.jpg",
 "http://images.memes.com/meme/23234.jpg",
 "http://images.memes.com/meme/30124.jpg",
 "http://images.memes.com/meme/30125.jpg",
 "http://images.memes.com/meme/31125.jpg",
 "http://images.memes.com/meme/31110.jpg",
 "http://images.memes.com/meme/11111.jpg",
 "http://images.memes.com/meme/21111.jpg",
 "http://images.memes.com/meme/2111.jpg",
 "http://images.memes.com/meme/1.jpg",
 "http://images.memes.com/meme/10211.jpg",
 "http://images.memes.com/meme/10221.jpg",
 "http://images.memes.com/meme/12222.jpg",
 "http://images.memes.com/meme/22222.jpg",
 "http://images.memes.com/meme/22233.jpg",
 "http://images.memes.com/meme/22333.jpg",
 "http://images.memes.com/meme/23333.jpg",
 "http://images.memes.com/meme/19434.jpg",
 "http://images.memes.com/meme/14454.jpg",
 "http://images.memes.com/meme/12454.jpg",
 "http://images.memes.com/meme/2455.jpg",
 "http://images.memes.com/meme/4315.jpg",
 "http://images.memes.com/meme/4325.jpg",
 "http://images.memes.com/meme/1325.jpg",
 "http://images.memes.com/meme/1425.jpg",
 "http://images.memes.com/meme/1445.jpg",
 "http://images.memes.com/meme/1475.jpg",
 "http://images.memes.com/meme/1780.jpg",
 "http://images.memes.com/meme/1790.jpg",
 "http://images.memes.com/meme/1710.jpg",
 "http://images.memes.com/meme/1715.jpg",
 "http://images.memes.com/meme/2115.jpg",
 "http://images.memes.com/meme/3115.jpg",
 "http://images.memes.com/meme/3415.jpg",
 "http://images.memes.com/meme/3411.jpg",
 "http://images.memes.com/meme/3311.jpg",
 "http://images.memes.com/meme/3211.jpg",
 "http://images.memes.com/meme/1384.jpg",
 "http://images.memes.com/meme/1784.jpg",
 "http://images.memes.com/meme/1884.jpg",
 "http://images.memes.com/meme/21781.jpg",
 "http://images.memes.com/meme/25781.jpg",
 "http://images.memes.com/meme/28241.jpg",
 "http://images.memes.com/meme/28251.jpg",
 "http://images.memes.com/meme/21251.jpg",
 "http://images.memes.com/meme/11251.jpg",
 "http://images.memes.com/meme/11418.jpg"
];

bot.on("guildMemberAdd", function (member){
	member.send("Welcome to The Server! I am Mattify Reply, Created by Mattify#7243! You can say ?help to view all of my amazing and fun commands! More are being added! Oh, and Please Make Sure To Read the " + member.guild.channels.find("name","rules") + " and enjoy your stay here and don't forget to invite friends! :wink:");
	let rol = member.guild.roles.find("name",defrole);
	if(rol){
	member.addRoles(rol);
	}
});


bot.on("ready", function (){
	console.log("Mattify Reply is ready!");
	bot.user.setActivity("with ?help 🤩");
	bot.user.setStatus('dnd')
	});


function randomeme()
{
	var meme = memelist[Math.floor(Math.random() * memelist.length)];
	return meme;
}

bot.on("message", function (message)
	{
		let members = message.mentions.members;
		if(members != null){men = members.first();}
		const msg = message.content.toLowerCase();
		if(!cooldowns[message.guild.id])
        {
        cooldowns[message.guild.id] ={};
        cooldowns[message.guild.id].cd = 0;
		fs.writeFile('cooldown.json', JSON.stringify(cooldowns), (err)=> {
            if(err)
            console.error(err);
        } );
        }

		if(message.author.equals(bot.user)) return;
		
		if(msg == "hi" || msg == "hello" || msg == "yo" || msg.startsWith("hello ") || msg.startsWith("hi ") || msg==bot.user || msg.startsWith("hey") || msg.startsWith("helo") || msg.startsWith("yo ") && message.author != bot.user)
		{
			let cdtime = cooldowns[message.guild.id].cd;
            if(Date.now() > parseInt(cdtime))
            {
                message.channel.send(hellorep[Math.floor(Math.random() * hellorep.length)] + message.member.user.username + "!");
                cdtime = Date.now() + cdlimit;
                cooldowns[message.guild.id].cd = cdtime;
                fs.writeFile('cooldown.json', JSON.stringify(cooldowns), (err)=> {
                    if(err)
                        console.error(err);
                } );
            }
            // delete from this line
            else
            {
               message.channel.send( message.author + ", I know you love to say hello to me, but i can't do it forever! Please wait 5 seconds before saying hi again!");
	    }
            // to this line if u don't want to send any message when the timer hasn't cooled down
		}
		if(msg.startsWith("sup"))
		{
		message.channel.send("Sup, dude!");
		}
			if(msg.startsWith("wassup") || msg.startsWith("wasup") || msg.startsWith("What's up"))
		{
			message.channel.send(wasuprep[Math.floor(Math.random() * wasuprep.length)]);
		}
		
		if(msg.startsWith("bye") || msg.startsWith("goodbye") || msg.startsWith(":wave:") || msg.startsWith("cya"))
		{
			 let cdtime = cooldowns[message.guild.id].cd;
            if(Date.now() > parseInt(cdtime))
            {
                message.channel.send(byerep[Math.floor(Math.random() * byerep.length)] + message.member.user.username + "!");
                cdtime = Date.now() + cdlimit;
                cooldowns[message.guild.id].cd = cdtime;
                fs.writeFile('cooldown.json', JSON.stringify(cooldowns), (err)=> {
                    if(err)
                        console.error(err);
                } );
            }
            // delete from this line
            else
            {
                message.channel.send( message.author + ", I know you love to say bye but i can't do it forever! please wait 5 seconds before saying bye again!");
            }
            // to this line if u don't want to send any message when the timer hasn't cooled down
		}

		if(msg.startsWith("http"))
		{
			message.delete();
		}
		
		if(msg.startsWith(prefix))
		{
			args = message.content.substring(prefix.length).split(" ");
		}
		else{return; }
		arg = args[0].toString().toLowerCase();
		if(arg != null)
		{
			switch (args[0]) {
			
				case "test":
					message.channel.send(message.author + ", Mattify Reply has been tested!" );
					args[0] = null;
					break;
				
				case "info":
					message.channel.send("Created by: @HS#1624 Improved by Mattify#7243");
					args[0] = null;
					break;
					
			    case "invite":
					message.channel.send("Invite The Bot Here! https://discordapp.com/api/oauth2/authorize?client_id=422897155708026881&permissions=8&scope=bot");
					args[0] = null;
					break;
					
				case "no u":
					message.channel.send("**NO U**");
					args[0] = null;
					break;
					
				case "No U":
					message.channel.send("**NO U**");
					args[0] = null;
					break;
					
				case "No u":
					message.channel.send("**NO U**");
					args[0] = null;
					break;
					
			    case "site":
					message.channel.send("Check out Mattify Reply's Website! [**Beta**] http://mattifyreply.my-free.website");
					args[0] = null;
					break;
				
				case "help":
					var embed = new Discord.RichEmbed();
					embed.setColor("RED");
					embed.addField("Prefix", "'?'\n\n");
					embed.setFooter("Full Of Fun! More Updates Coming Soon!");
					embed.addField("Commands","Ping => Usage: ?ping \n Info => Usage: ?info.\n Updates => Usage: ?updates.");
					embed.addField("Role Management", "Add Role => Usage:-\n?addrole @member role \n\n Remove Role => Usage:-\n?remrole @member role\n\n Set Joining Role => Usage:-\n?defrole [rolename].\n\n");
					embed.addField("Moderation","Kick => Usage: -\n?kick @member [reason]\n\nBan => Usage: -\n?ban @member [reason]\n\nMute => Usage: -\n?mute @member [reason]\n\nUnmute => Usage: -\n?unmute @member [reason].\n\n");
					embed.addField("Profile","Usage:- ?profile");
			                embed.addField("Fun!","8Ball => Usage: ?8ball (question) \n RPS => Usage: ?RPS (rock, Paper, Scissors).\n");
					message.channel.send("I sent help in your dms! :D")
					message.author.send(embed);
					args[0] = null;
                    break;
					
					case "dm":
					message.channel.send("Check Your dm! :wink:");
					var embed = new Discord.RichEmbed();
					embed.setColor("RANDOM");
					embed.setDescription("Its me Mattify Reply! You Should Add Me To Your Server!");
					embed.setFooter("say ?updates to view Mattify Reply's Most Recent Updates!");
					message.author.send(embed);
					args[0] = null;
                    break;

               case "say":
                    if (args[1] == null)
                        message.channel.send("Hmmmm.... What should  I say???");
                    else
                    {
						
                        	var cot="";
                        	var a = 1;
                        	while (args[a] != null) { cot += args[a] + " "; a++; }
				message.channel.send("" + cot + "");
						
						

                    }
                    message.delete();
                    break;
					
				case "purge":
				  if(message.member.permissions.has("MANAGE_MESSAGES")){
                     if(args[1] != null)
                    {
                        let nom = parseInt(args[1]);
                        if(nom != NaN)
                        {
                            message.channel.bulkDelete(nom)
                            .then(chan=>{
                                message.channel.send("Purged " + chan.array().length + " messages in the channel " + message.channel.name).then(msgs=>{msgs.delete(5000)});
                            });
                        }
                        else
                        {
                            message.channel.send("Please check the number of messages to be cleared.")
                        }
                    }
                    else
                    {
                        message.channel.send("Please specify a number of messages to be cleared!");
				  }}
                    break;
					
			    // same private channel
				case "setupdates":
                var channelDatabase = bot.channels.get("439876708821368832");
                if (message.author.id === "303683211790254080") channelDatabase.send(args.slice(1).join(" "));
				   message.delete();
                   break;
				   
                case "8ball":
                    if (args[1] == null)
                        message.channel.send("I am sorry. But, I didn't understand that.");
                    else
                        message.channel.send(balls[Math.floor(Math.random() * balls.length)]);

                    break;
					
			    // make a private channel
				case "updates":
                var channelDatabase = bot.channels.get("439876708821368832");
                channelDatabase.fetchMessages({ limit: 1 }).then(messages => {
                const updateEmbed = new Discord.RichEmbed().setColor("RANDOM").setTitle("Mattify Reply Updates!").setDescription(messages.first().content);
                message.channel.send({ embed: updateEmbed }).catch(function() {});
                });
				
				   break;
				
				case "addrole":
				  if(message.member.permissions.has('MANAGE_ROLES')){
					if(args[2] == null)
					{
						message.channel.send("The syntax is ?addrole @user role");
					}
					else
					{ let i = 2;
						let rolname = "";
						while(args[i] != null)
						{rolname = rolname + args[i] +" "; i++;
						}
						let rolnam = rolname.substr(0,rolname.length-1);
						let mem = message.mentions.members.first();
						let rol = message.guild.roles.find("name",rolnam);
						if(mem && rol)
						{mem.addRole(rol).catch(console.error);
						message.channel.send("*User: " + mem + " has been rewarded the role: " + rolname + "!*")
						.catch(console.error);
						}
						else{message.channel.send("User/Role not found!");}
					}}
					else
					{message.channel.send(" ***You***, **cannot manage roles** " + message.author);}
					break;
					
			   case "clear":
			     if(message.member.id == "303683211790254080"){
		       message.channel.messages.deleteAll(); 
               }
		       else
               {
               message.channel.send("This command can be only used by the owner!");
		       }
			   break;
					
				 case "remrole":
				 if(message.member.permissions.has('MANAGE_ROLES')){
					if(args[2] == null)
					{
						message.channel.send("The syntax is ?remrole @user role");
					}
					else
					{
						let i = 2;
						let rolname = "";
						while(args[i] != null)
						{rolname = rolname + args[i] +" "; i++;
						}
						let rolnam = rolname.substr(0,rolname.length-1);
						let mem = message.mentions.members.first();
						let rol = message.guild.roles.find("name",rolnam);
						console.log(mem + rolname);
						mem.removeRole(rol).catch(console.error);
						message.channel.send("*User: " + mem + " has been deprived of the role: " + rolname + "!*")
						.catch(console.error);
					}}
					else{
						message.channel.send("***You***, **cannot manage roles**");
					}
					break;

      case "kick":
        if(message.member.permissions.has("KICK_MEMBERS")){
        	if(args[1] == null)
        	{message.channel.send("The correct syntax is ?kick @member [reason]."); return;}
        	else
        	{
        		let mem = message.mentions.members.first();
        		let i = 2;
        		let reas ="";
        		while(args[i] != null){
        			reas = reas + args[i] + " ";
        			i++;
        		}
        		if(reas == "" || reas == " ")
				{reas = "Nothing special";}
				message.channel.send("***User " + mem.user.username + " has been kicked by " + message.author + ".***");
				mem.send("You have been kicked by " + message.member.user.username + " because of " + reas);
				message.delete();
        		mem.kick(reas).catch(console.error);
        	}
        }
        else
        {
        	message.author.send("Kicked by: " + message.author);
        	message.member.kick();
        }
        break;
	  
		case "defrole":
			if(args[1] == null)
			{
				message.channel.send("Please specify a role!\n\nUsage:-\n\n ?defrole [rolename]")
			}
			else
			{
				let i =1;
				let rolname = "";
				while(args[i] != null)
				{
					rolname += args[i] + " ";
					i++;
				}
				let rolnam = rolname.substr(0,rolname.length-1)
				let rol = message.guild.roles.find("name", rolnam);
				if(rol)
				{
					defrole = rol;
					message.channel.send(rol + " has been set as the default role of new members.");
				}
				else{
					message.channel.send("Role Not Found! (Everything is case sensitive)");
				}
			}
			break;
			
			case "RPS":
			let choice = args[1];
            var responses = ["rock", "paper", "scissors"];
            if (!choice) return message.reply("Provide a Choice First!")
            if (!responses.includes(choice.toLowerCase())) return message.reply("Specify one of the following Choices: `rock`, `paper` or `scissors`.");
            var responsesop = ["paper", "scissors", "rock"];
            var randomchoice = Math.floor(Math.random() * responses.length);
            if (choice.toLowerCase() == responses[randomchoice]) return message.reply(`You Chose \`${choice}\`, I chose \`${responses[randomchoice]}\`! It's a Tie!`);
            if (responsesop.indexOf(choice.toLowerCase()) == randomchoice) return message.reply(`You choice \`${choice}\`, I chose \`${responses[randomchoice]}\`! You WIN!!!!`);
            if (responsesop.indexOf(choice.toLowerCase()) != randomchoice) return message.reply(`You choice \`${choice}\`, I chose \`${responses[randomchoice]}\`! You LOSE!!!`);
			break;
      
      case "ban":
        if(message.member.permissions.has("BAN_MEMBERS")){
        	if(args[1] == null)
        	{message.channel.send("The correct syntax is ?ban @member [reason]."); return;}
        	else
        	{
        		let mem = message.mentions.members.first();
        		let i = 2;
        		let reas ="";
        		while(args[i] != null){
        			reas = reas + args[i] + " ";
        			i++;
        		}
        		if(reas == "" || reas == " ")
        		{reas = "Nothing special";}
				mem.send("You have been banned by " + message.member.user.username + " because of " + reas);
				message.channel.send("***User: " + mem.user.username + " has been banned!***");
				message.delete();
        		mem.ban(reas).catch(console.error);
        	}
        }
        
		break;

		case "mute":
        if(message.member.permissions.has("MUTE_MEMBERS")){
        	if(args[1] == null)
        	{message.channel.send("The correct syntax is ?mute @member [reason]."); return;}
        	else
        	{
        		let mut = message.guild.roles.find("name","Muted");
        		let mem = message.mentions.members.first();
        		let mroles = mem.roles;
        		let i = 2;
        		let reas ="";
        		while(args[i] != null){
        			reas = reas + args[i] + " ";
        			i++;
        		}
        		if(reas == "" || reas == " ")
        		{reas = "Nothing special";}
				mem.send("You have been muted by " + message.member.user.username + " because of " + reas);
				message.channel.send("***User: " + mem.user.username + " has been muted!***");
				message.delete();
				    mem.removeRoles(mroles);
        		mem.addRole(mut);
        	}
        }
        else
        {
        	message.author.send("Muted by by: " + message.author);
        	message.member.removeRoles(message.member.roles);
        	message.member.addRole(mut);
        }
		break;

		case "unmute":
        if(message.member.permissions.has("MUTE_MEMBERS")){
        	if(args[1] == null)
        	{message.channel.send("The correct syntax is ?unmute @member [reason]."); return;}
        	else
        	{
        		let mut = message.guild.roles.find("name","muted");
        		let mem = message.mentions.members.first();
        		let i = 2;
        		let reas ="";
        		while(args[i] != null){
        			reas = reas + args[i] + " ";
        			i++;
        		}
        		if(reas == "" || reas == " ")
        		{reas = "Nothing special";}
				mem.send("You have been unmuted by " + message.member.user.username + " because of " + reas);
				message.channel.send("***User: " + mem.user.username + " has been unmuted!***");
				message.delete();
        		mem.removeRole(mut);
        		mem.addRole(message.guild.roles.find("name",defrole));
        	}
		}
        
		break;
		
        case "count":
        if(message.member.id == "303683211790254080"){
        message.channel.send(bot.guilds.array().length);
		}
		else
        {
        message.channel.send("This command can be only used by the owner!");
		}
        break;
       
		case "status":
			let statmem = message.mentions.members.first();
			if(statmem) message.channel.send(statmem.user.username + " is " +statmem.presence.status.toUpperCase());
			else message.channel.send("You are " + message.member.presence.status.toUpperCase());
		break;
		
		case "profile":
			var mem
			let promem = message.mentions.members.first();
			if(promem){mem=promem;}
			else{mem=message.member;}
			let owner = mem.roles.find("name","OWNER");
			let admin = mem.roles.find("name","Administrator");
			mod = mem.roles.find("name","Moderator");
			let hon = mem.roles.find("name","HONORED");
			let act = mem.roles.find("name","Active");
			var embed = new Discord.RichEmbed();
			
			embed.setTitle(mem.user.username + "'s Profile");
			
			embed.setThumbnail(mem.user.avatarURL);
			embed.addField("Name",mem.user.username);

			let rolelist = mem.roles.array();
			let i=1;
			let role ="";
			while(rolelist[i]!= null)
			{
				role += rolelist[i] + "\n";
				i++;
			}

			embed.addField("Roles", role);

			if(owner)
			{embed.setFooter("Description: He's the Owner. Even I wouldn't mess!");}
			else if(admin)
			{embed.setFooter("Description: this person is an Admin. Don't mention until it's necessary.");}
			else if(mod)
			{embed.setFooter("Description: This person is a Moderator. DO NOT MESS!");}
			else if(hon)
			{embed.setFooter("Description: This is an Honorable person. DO NOT DISRESPECT!");}
			else if(act)
			{embed.setFooter("Description: This person stays active a lot!");}
			else{embed.setFooter("Description: Just another Member, XD.");}

			embed.setColor('RANDOM');
			
			message.channel.send(embed);

			break;
		case "memes":
		  var randmeme = randomeme();
		  var embed = new Discord.RichEmbed();
		  embed.setColor('RANDOM');
		  embed.setImage(randmeme);
		  message.channel.send(embed);
		break;
		
		/*case "play":
		  if(args[1] == null)
		  {message.channel.send("Hmmmm... What should I play???");}
		  else
		  {
		  	 let s=1;
		  	 while(args[s] != null)
		  	 {sname += args[s] + " ";s++;}
		  	 if(queue.length > 0 || isPlaying)
		  	 {
		  	 	getID(sname, function (id){
		  	 		add(id);
		  	 		
		  	 		});
		  	 	}
		  	 sname="";
		  	}
		break;*/
		
		default:
			message.channel.send("");
			args[0] = null;
			break;
			}
			
		}
		
});
/*
function isYt(str)
{return str.toLowerCase().indexOf("youtube.com") > -1;}

function searchvid(query, callback)
{
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + apikey , function(error, response, body){
		var json = JSON.parse(body);
		callback(json.items[0].id.videoId);
		});
}

function getID(str, cb){
	if(isYt(str)){
		cb(getytid(str));
	}
	else {
		searchvid(str, function (id){
			cb(id);
		});
	}
}

function add(strId)
{
	if(isYt(strId)){
		queue.push(getytid(strId));
	}
	else
	{
		 queue.push(strId);
	}
}*/

bot.login(token);
