const client = require('../../src/index');

const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  }

const act = [
  '"over " + client.guilds.cache.size + " servers | <help"',
  'client.users.cache.size + " users in over " + client.guilds.cache.size + " servers"'
]

client.on('ready', () => {
  const express = require('express');
  const bodyParser = require('body-parser');

  const app = express();
  const path = require('path')

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
  });

  app.get('/info', (req, res) => {
    res.sendFile('info.html', { root: path.join(__dirname, '../public') });
  });

  app.listen(3000, () => console.log('express server started'));

  console.log(`${client.user.tag} is now online for ${client.guilds.cache.size} guilds and ${client.users.cache.size} users!`);

  setInterval(() => {
    client.user.setActivity("over " + client.guilds.cache.size + " servers | <help", { type: "WATCHING" })
  }, 60000); // Runs this every 60 seconds.
})