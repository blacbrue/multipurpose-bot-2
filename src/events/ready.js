const client = require('../../src/index');

const act = [
  '"over " + client.guilds.cache.size + " servers | <help"',
  'client.users.cache.size + " users in over " + client.guilds.cache.size + " servers"'
]

client.on('ready', () => {
  console.log(`${client.user.tag} is now online for ${client.guilds.cache.size} guilds and ${client.users.cache.size} users!`);

  setInterval(() => {
    client.user.setActivity("over " + client.guilds.cache.size + " servers | <help", { type: "WATCHING" })
  }, 60000); // Runs this every 60 seconds.
})