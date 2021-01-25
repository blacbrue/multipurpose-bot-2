const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/command')
const config = require('../../config.json')

module.exports = {
    name: 'command-enable',
    cooldown: 10000,
    aliases: ['cmd-enable'],
    description: "ADMIN ONLY COMMAND. Enables a disabled command",
    usage: "\n<command-enable snipe\n<cmd-enable snipe",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need administrator permissions to use this command')
        if (message.author.id == config.ownerID || message.member.hasPermission('ADMINISTRATOR')) {
            const cmd = args[0];
            if (!cmd) return message.channel.send('Please specify a command')
            if (!!client.commands.get(cmd) === false) return message.channel.send('This command does not exist');
            schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    if (data.Cmds.includes(cmd)) {
                        let commandNumber;

                        for (let i = 0; i < data.Cmds.length; i++) {
                            if (data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                        }

                        await data.save()
                        message.channel.send(`Enabled ${cmd}!`)
                    } else return message.channel.send('That command isnt turned off.')
                }
            })
        }
    }
}