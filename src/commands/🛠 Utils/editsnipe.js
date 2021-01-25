const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'editsnipe',
    cooldown: 20000,
    description: "Get the original message of the latest edited message.",
    aliases: ['es'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const snip = client.editSnipe.get(message.channel.id)
    
        if(!snip) return message.channel.send(":x: Not found.")
    
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Message Edited")
        .setAuthor(snip.user,snip.profilephoto)
        .setDescription(`**Original Message:** ${snip.msg}`)
        .setTimestamp(snip.date)
        if(snip.image) embed.setImage(snip.image)
    
        message.channel.send(embed)
    }
}