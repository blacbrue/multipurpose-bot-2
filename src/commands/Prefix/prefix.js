const prefixSchema = require('../../models/prefix')
const { Message, MessageEmbed } = require('discord.js')
const conf = require('../../config.json')

module.exports = {
    name : 'prefix',
    cooldown: 10000,
    description: "Sets a custom prefix for your server",
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(message.author.id !== conf.ownerID) return;
        if(message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            new MessageEmbed()
            .setTitle("You cannot use this command")
            .addFields(
                { name: "You cannot use this command due to:", value: "Missing Permission: ``ADMINISTRATOR``"}
            )
        );

        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**`)
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Custom prefix in this server is now set to **${res}**`)
            }
        })
    }
}