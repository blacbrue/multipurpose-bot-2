const db = require('../../reconDB')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "setbackground",
    aliases: ['setbg'],
    description: 'Sets Rank Profile Background',
    cooldown: 10000,
    run: async (client, message, args) => {
        let user = message.author;

        let newBg = message.attachments.first()
        let fetchBg = await db.get(`bg_${user.id}`);
        if (!newBg) {
            if (fetchBg) {
                return message.channel.send(`**Profile Background Already Set As - \`${fetchBg}\`**`)
            } else {
                return message.channel.send("**You Need To Upload The Image To Set New Background!**")
            }
        }
        db.set(`bg_${user.id}`, newBg.url)

        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Your Background Image Has Been Set`, user.displayAvatarURL())
            .setDescription(`**\`Rank Background Has Been Set to :\nLink - \`${newBg.url}\`!**`)
            .setFooter(`To Check Background Type m!rank`)
        return message.channel.send(embed)
    }
}