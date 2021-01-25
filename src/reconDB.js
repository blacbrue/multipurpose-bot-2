const { reconDB } = require('reconlx')

const db = new reconDB({
    uri : process.env.MONGOTOKENFORBGRANK
});
  
module.exports = db;