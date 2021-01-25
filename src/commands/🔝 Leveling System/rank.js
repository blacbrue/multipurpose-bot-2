const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const db = require('../../reconDB')

module.exports = {
    name: 'rank',
    cooldown: 10000,
    description : "Returns a bootiful rank card",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.users.first() || message.author;
 
        const user = await Levels.fetch(target.id, message.guild.id, true);

        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        let fetchBg = await db.get(`bg_${target.id}`) || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0-SnlJhsOT9SA1R1VObA-lRjTFKWsYYXwg&usqp=CAU%27"
 
        if (!user) return message.channel.send("Seems like you have not earned any XP so far.");
 
        const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setCurrentXP(user.xp)
        .setRequiredXP(neededXp)
        .setLevel(user.level)
        .setRank(parseInt(user.position))
        .setStatus(target.presence.status)
        .setProgressBar('BLUE', "COLOR")
        .setBackground('IMAGE', fetchBg)
        .setUsername(target.username)
        .setDiscriminator(target.discriminator)
        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, 'rank.png')
                message.channel.send(attachment);
            })
    }
}