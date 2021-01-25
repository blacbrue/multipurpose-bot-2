const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix
const { confirmation } = require('@reconlx/discord.js')
const conf = require('../../config.json')

module.exports = {
    name : 'prefix-reset',
    cooldown: 10000,
    description: "Resets custom prefix",
    run : async(client, message) => {
        if(message.author.id !== conf.ownerID) return;
        if(message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            new MessageEmbed()
            .setTitle("You cannot use this command")
            .addFields(
                { name: "You cannot use this command due to:", value: "Missing Permission: ``ADMINISTRATOR``"}
            )
        );

        message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if(emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                message.channel.send(`The prefix has been reset to ${prefix}`)
            }
            if(emoji === '❌') {
                msg.delete()
                message.channel.send('reset prefix has been cancelled.')
            }
        })

    }
}