const { readdirSync } = require('fs');
module.exports = async(client) => {
    readdirSync("./ApplicationCmds/").map(async dir => {
        readdirSync(`./ApplicationCmds/${dir}/`).map(async cmd=> {
            let pull = require(`../ApplicationCmds/${dir}/${cmd}`)
            client.slash.set(pull.name, pull)
        })
    })
}