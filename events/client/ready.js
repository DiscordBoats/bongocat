require('colors')

module.exports = async client => {
      await client.shard.broadcastEval(client => client.user.setStatus('dnd'))
      client.shard.broadcastEval((bot) => bot.guilds.cache.size).then((res) => {
            console.log(`[ Client ]`.blue + ` Logged in as ${client.user.tag} | loaded ${res.reduce((prev, val) => prev + val, 0).toLocaleString()} servers and ${client.options.shardCount.toLocaleString()} shards.`.magenta);
      })

};