const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot;

module.exports = {
    name: 'awooify',
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const image = await api.generate('awooify', { url: user.displayAvatarURL() })
        const msg = new MessageAttachment(image, 'awooified.png')
        message.channel.send(msg)
    }
}