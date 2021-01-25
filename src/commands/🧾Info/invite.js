const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    cooldown: 10000,
    cooldown: '10000',
    description: "Returns a nice embed and a link to invite this bot into your other Discord Servers",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Invite me to your servers!")
            .setDescription("My goal is to make this bot to be in 75 servers!")
            .addFields(
                { name: "Invite link", value: "Add Multipurpose Bot 2 into your other servers! [Click Here](https://discord.com/api/oauth2/authorize?client_id=784222471540310047&permissions=16252480&scope=bot)" }
            )
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))

        message.channel.send(embed)
    }
}