const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    cooldown: 10000,
    description: "Shows the avatar of the mentioned user or jsut your avatar",
    usage: "\n<avatar @username",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const aE = new MessageEmbed()
           .setColor('RANDOM')
           .setTitle(user.tag)
           .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
           .setTimestamp();

        message.channel.send(aE)
    }
}