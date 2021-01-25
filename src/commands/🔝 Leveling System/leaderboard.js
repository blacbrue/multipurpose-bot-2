const Levels = require("discord-xp");
const  { MessageEmbed } = require('discord.js')
module.exports ={
    name:'leaderboard',
    aliases:['lb'],
    cooldown: 10000,
    run:async(client,message,args)=>{
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
 
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
 
        const lb = leaderboard.map(e => `${e.position}. **${e.username}#${e.discriminator}** Level: ${e.level} XP: ${e.xp.toLocaleString()}`);
 

        

        const embed = new MessageEmbed()
        .setTitle('**Leaderboard**')
        .setDescription(`\n${lb.join("\n")}`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
        
    }
}