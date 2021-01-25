const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name: 'shutdown',
    description: 'Shutdown bot bruh',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== config.ownerID) return message.reply("You are not allowed to use this command");

        if(message.author.id === config.ownerID) {
            message.channel.send('shutting down bot')
            process.exit()
        }
   }
}