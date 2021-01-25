const client = require('../../src/index')
const { Collection, MessageEmbed } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms')
const config = require('../config.json');
const db = require('../models/command');
// const cmddisena = require('../models/command');
// const { dbforcmddisanden } = cmddisena

client.on('message', async message => {
    const p = await client.prefix(message)
    if (message.mentions.users.first()) {
        if (message.mentions.users.first().id === '784222471540310047') return message.channel.send(`Prefix in ${message.guild.name} is ${p}`)
    }
    if (!message.content.startsWith(p)) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.cooldown) {
            if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        }
        const check = await db.findOne({ Guild: message.guild.id })
        if (check) {
            if (check.Cmds.includes(command.name)) return message.channel.send('This command has been disabled by the Admins')
            command.run(client, message, args)
        }
        else {
            command.run(client, message, args)
        }
    }
});

client.snipe = new Map()

client.on("messageDelete", async (message, channel) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    client.snipe.set(message.channel.id, {
        msg: message.content,
        user: message.author.tag,
        profilepicture: message.author.displayAvatarURL({ dynamic: true }),
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: message.createdTimestamp
    })
})

client.editSnipe = new Map()

client.on('messageUpdate', function (message, channel) {
    if (message.author.bot) return;
    if (!message.guild) return;
    client.editSnipe.set(message.channel.id, {
        msg: message.content,
        user: message.author.tag,
        profilephoto: message.author.displayAvatarURL(),
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: message.createdTimestamp

    })
})

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log('deleted data.'))
        }
    })
})

// client.on('guildMemberAdd', async (member) => { // this event gets triggered when a new member joins the server!
//     // Firstly we need to define a channel
//     // either using .get or .find, in this case im going to use .get()
//     const channel = member.guild.channels.cache.find(ch => ch.name === "welcome") //insert channel id that you want to send to
//     //making embed
//     const embed = new MessageEmbed()
//         .setColor('GREEN')
//         .setTitle('New Member')
//         .setDescription(`**${member.displayName}** welcome to **${member.guild.name}**, we now have **${member.guild.memberCount}** members!`)
//     // sends a message to the channel
//     channel.send(embed)
// })

// client.on('guildMemberRemove', async (member) => { // this event gets triggered when a new member leaves the server!
//     // Firstly we need to define a channel
//     // either using .get or .find, in this case im going to use .get()
//     const Channel = message.guild.channels.find(channel => channel.name === "goodbye" ); //insert channel id that you want to send to
//     //making embed
//     const embedleft = new MessageEmbed()
//         .setColor('RED')
//         .setTitle('A member left the server :(')
//         .setDescription(`**${member.displayName}** has left **${member.guild.name}**, we now have **${member.guild.memberCount}** members!`)
//     // sends a message to the channel
//     Channel.send(embedleft)
// })