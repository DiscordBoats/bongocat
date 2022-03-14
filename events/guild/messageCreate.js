const Timeout = new Set(),
    { MessageEmbed, Permissions, WebhookClient} = require('discord.js'),
    humanizeDuration = require("humanize-duration"),
    prefix = process.env.prefix,
    Discord = require("discord.js"),
    Schema = require("../../Database/Schema/Guild"),
    userSchema = require("../../Database/Schema/User")
module.exports = async (client , message) => {
    if (message.author.bot) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.member.id);
    if (!message.guild) return;

    const mention = new RegExp(`^<@!?${client.user.id}>`);

    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    const command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                const embed = new MessageEmbed()
                    .setTitle('You are in timeout!')
                    .setDescription(`:x: You need to wait **${humanizeDuration(command.timeout, { round: true })}** to use command again`)
                    .setColor('#ff0000')
                return message.channel.send({ embeds: [embed] })
            } else {
                command.run(client, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        } else {
            command.run(client, message, args)
        }
    }
}