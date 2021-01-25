const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot;

module.exports = {
    name: 'whowouldwin',
    description: "Generates a 'Who Would Win' meme template",
    usage: "\n<whowouldwin @user1 @user2",
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user1 = message.mentions.users.first()
        const user2 = message.mentions.users.last()

        if(!user1) return message.reply('please specify a user to use this command')
        if(!user2) return message.reply('please specify a second user to use this command')

        const image = await api.generate("whowouldwin", { user1: user1.displayAvatarURL({ dynamic: false }), user2: user2.displayAvatarURL({ dynamic: false }) });
        const msg = new MessageAttachment(image, "whowouldwin.png")
        message.channel.send(msg)
    }
}