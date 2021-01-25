const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe',
    cooldown: 20000,
    usage: "",
    description: "Shows the most recently deleted message. Basically sniping",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const snip = client.snipe.get(message.channel.id);

        if(!snip) return message.channel.send(":x: Not found.")

        const embed = new MessageEmbed()
        .setAuthor(snip.user, snip.profilepicture)
        .setColor('RANDOM')
        .setDescription(`**Message Content:** ${snip.msg}`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))
        if(snip.image) embed.setImage(snip.image)

        message.channel.send(embed)
    }
}