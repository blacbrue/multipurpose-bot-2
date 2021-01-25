const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    cooldown: 10000,
    aliases: ['clear'],
    usage: "\n<clear 85\n<purge 78",
    description: "Clears up to 99 messages",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const heyuser = message.author;
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${heyuser}, you do not have permissions to use this command`)
    
    if (!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
      .then(message => {
        message.delete({ timeout: 2000 })
      })
      .catch(console.error);

    if (isNaN(args[0])) return message.channel.send('Numbers are only allowed')
      .then(message => {
        message.delete({ timeout: 2000 })
      })
      .catch(console.error);

    if (parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99')
      .then(message => {
        message.delete({ timeout: 2000 })
      })
      .catch(console.error);
      
    await message.channel.bulkDelete(parseInt(args[0]) + 1)
      .catch(err => console.log(err))
    message.channel.send('Deleted ' + args[0] + " messages.")
      .then(message => {
        message.delete({ timeout: 2000 })
      })
      .catch(console.error);
    }
}