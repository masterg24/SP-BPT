const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = 's-'; // your prefix
client.on('message', message => {
  if(message.content.split(' ')[0] == `${prefix}ban`){
  if(!message.guild || message.author.bot) return undefined;
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have permission.');
      if(!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.channel.send('I don\'t have permission.');
      let args = message.content.split(" ").slice(1);
      let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if(!user) return message.channel.send(`Usage: ${prefix}ban @mention reason`);
      if(!reason) reason = 'No reason provided.';
      if(user.user.id === message.author.id) return message.channel.send('You can\'t ban yourself!');
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`You can't ban **${user.user.tag}** because his role highest than your role!`);
     if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`I can't ban **${user.user.tag}** because his role highest than my role!`);
      if(message.guild.member(user.user).hasPermission('MANAGE_GUILD') || user.user.id == message.guild.owner.id) return message.channel.send(`You can't ban **${user.user.tag}** because he have Administration permissions!`);
     if(!message.guild.member(user.user).bannable) return message.channel.send(`I can't ban **${user.user.tag}**.`);
      message.guild.member(user).ban(reason, user);
      message.channel.send(`Done :+1:, I Banned ${user.user.username} from the server!\nReason: \`\`${reason}\`\``);
    }
});
  client.on('message', async message => {
            if(message.content.includes('discord.gg')){
                if(message.member.hasPermission("MANAGE_GUILD")) return;
        if(!message.channel.guild) return;
        message.delete()
      }
    })
    client.on('message', message => {
  if(message.content.split(' ')[0] == `${s-}kick`){
  if(!message.guild || message.author.bot) return undefined;
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | You dont have **KICK_MEMBERS** Permission!');
      if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | I dont have **KICK_MEMBERS** Permission!');
      let args = message.content.split(" ").slice(1);
      let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if(!user) return message.channel.send("**• | Usage:** !kick \`\`@Name\`\` reason");
      if(!reason) reason = 'No reason provided.';
      if(user.user.id === message.author.id) return message.channel.send(':no_entry: | Why you want kick **Your Self** ?');
      if(user.user.id === message.guild.owner.id) return message.channel.send(':no_entry: | Nice try dude \:D');
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_entry: | You cant give **${user.user.username}** Kick because his role highest than your role!`);
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`:no_entry: | I cant give **${user.user.username}** Kick because his role highest than my role!`);
      if(!message.guild.member(user.user).kickable) return message.channel.send(`:no_entry: | I cant give **${user.user.username}** Kick.`);
      if(message.guild.member(user.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`:no_entry: | You cant give **${user.user.username}** Kick because he have Administration permissions!`);
      message.guild.member(user).kick(reason, user);
      message.channel.send(`:white_check_mark: | Successfully \`\`KICKED\`\` ${user.user.username} from the server! :airplane: \`\`${reason}\`\``);
    }
});
var moment = require("moment");
client.on("message", message => {
    if(message.content.startsWith(s- + "server")){
        if(message.author.bot || message.channel.type == "dm") return;
        let onlineM = message.guild.members.filter(m => m.presence.status !== "offline");
        let verifyL = ["None", "Low", "Medium", "Hard", "Extreme"];
        let region = {
            'brazil': "`Brazil`",
            'eu-central': "`Central Europe`",
            'singapore': "`Singapore`",
            'us-central': "`US Central`",
            'sydney': "`Sydney`",
            'us-east': "`US East`",
            'us-south': "`US South`",
            'us-west': "`US West`",
            'eu-west': "`Western Europe`",
            'london': "`London`",
            'amsterdam': "`Amsterdam`",
            'hongkong': "`Hong Kong`",
            'russia': "`Russia`"
        };
        let serverEmbed = new Discord.RichEmbed()
        .setColor("#36393e")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name}, Server Info`)
        .setDescription(`- Server Name \`${message.guild.name}\`\n- Created At \`${moment(message.guild.createdAt).format('D/MM/YYYY h:mm a')}\`\n- Total Members \`${message.guild.memberCount} [Online: ${onlineM.size}]\`\n- Server Owner \`${message.guild.owner.user.tag}\`\n- Channels \`${message.guild.channels.filter(m => m.type == 'text').size} Text || ${message.guild.channels.filter(m => m.type == 'voice').size} Voice\`\n- Categories \`${message.guild.channels.filter(m => m.type == 'category').size}\`\n- Roles \`${message.guild.roles.size}\`\n- Region \`${region[message.guild.region]}\`\n- Verification Level \`${verifyL[message.guild.verificationLevel]}\`\n- Server ID \`${message.guild.id}\``)
        .setFooter(message.client.user.username,message.client.user.avatarURL);
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`:no_entry: You dont have permission!`).then(mm => mm.delete(5000));  message.channel.send(serverEmbed).catch(console.error);
    } else if(message.content.startsWith(prefix + "user")){
        if(message.author.bot || message.channel.type == "dm") return;
        let mnt = message.mentions.users.first();
        let user = mnt || message.author;
        let userEmbed = new Discord.RichEmbed()
        .setColor("#36393e")
        .setThumbnail(user.avatarURL)
        .setAuthor(`${user.username}, User Info`)
        .setDescription(`- Name \`${user.tag}\`\n- Created At \`${moment(user.createdAt).format('D/MM/YYYY h:mm a')}\`\n- Joined At \`${moment(user.joinedAt).format('D/MM/YYYY h:mm a')}\`\n- ID \`${user.id}\``)
        .setFooter(message.client.user.username,message.client.user.avatarURL);
        message.channel.send(userEmbed).catch(console.error);
       
    }
});      
