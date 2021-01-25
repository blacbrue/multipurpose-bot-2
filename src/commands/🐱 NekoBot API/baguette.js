const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot;

module.exports = {
    name: 'baguette',
    cooldowm: 10000,
    usage: "\n<baguette @user",
    description: "ur avatar is gonna be in a anime girl's face. and that girl is eating a baeguette",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const image = await api.generate("baguette", { url: user.displayAvatarURL() });
        const msg = new MessageAttachment(image, 'baguette.png')
        message.channel.send(msg)
    }
}