require('dotenv').config
const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    disableMentions: 'everyone'
});
const config = require('./config.json');
const mongoose = require('mongoose');
const mongoDBpass = config.dbtoken;
const Levels = require("discord-xp");

mongoose.connect(process.env.MONGOTOKEN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to MongoDB'))

Levels.setURL(process.env.MONGOTOKENFORXP))

const prefixSchema = require('./models/prefix')

const path = require('path')
const fs = require('fs')
module.exports = client;
client.commands = new Collection();
const prefix = config.prefix;
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
});

client.prefix = async function (message) {
    let custom;

    const data = await prefixSchema.findOne({ Guild: message.guild.id })
        .catch(err => console.log(err))

    if (data) {
        custom = data.Prefix;
    } else {
        custom = prefix;
    }
    return custom;
}

client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    }
});

client.login(process.env.DISCORD_TOKEN)