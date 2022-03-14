module.exports = {
    name: "roles",
    description: "Bot evaluation command",
    timeout: 5000,
    run: async(client, msg, args) => {
        if(!msg.member.permissions.has("MANAGE_ROLES")) return msg.channel.send("You don't have the permission to use this command - `MANAGE_ROLES`");

        

    }
    }