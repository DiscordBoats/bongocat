const Discord = require('discord.js');

module.exports = async(client, message) => {
    /**
     * const logChannel = client.channels.cache.get('asdasdasd');
     *     if (!logChannel) return;
     *     const allLogs = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" });
     *     const fetchModerator = allLogs.entries.first();
     *     const embed = new Discord.MessageEmbed()
     *     .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
     *     .setDescription(`🗑 **Message sent by ${message.author} deleted in ${message.channel}.**\n${message.content}`)
     *     .addField('Responsible Moderator:', `<@${fetchModerator.executor.id}>`)
     *     .setTimestamp()
     *     .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
     *     return logChannel.send({ embeds: [embed] })
     */
}