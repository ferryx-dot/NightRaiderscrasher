module.exports = {
  name: 'kickall',
  aliases: ['purgeall', 'nightpurgeall'],
  description: 'ʙᴀɴɪsʜ ᴀʟʟ ɴᴏɴ-ᴀᴅᴍɪɴ ᴍᴇᴍʙᴇʀs',
  ownerOnly: true,
  groupOnly: true,
  adminOnly: true,
  
  async execute(sock, msg, args, { sender, groupId, isOwner }) {
    try {
      if (!isOwner) {
        return sock.sendMessage(groupId, { 
          text: '💀 ᴏɴʟʏ ᴛʜᴇ ʟᴏʀᴅ ᴄᴀɴ ᴘᴜʀɢᴇ ᴛʜᴇ ʀᴇᴀʟᴍ!' 
        });
      }

      const groupMetadata = await sock.groupMetadata(groupId);
      const participants = groupMetadata.participants;
      
      // Filter out admins and bot itself
      const nonAdmins = participants.filter(p => !p.admin && p.id !== sock.user.id);
      
      if (nonAdmins.length === 0) {
        return sock.sendMessage(groupId, { 
          text: '⚠️ ɴᴏ ɴᴏɴ-ᴀᴅᴍɪɴs ғᴏᴜɴᴅ ᴛᴏ ᴘᴜʀɢᴇ.' 
        });
      }

      // Send initial message
      await sock.sendMessage(groupId, { 
        text: `╔═══════════════════════════════════════════╗
║ 💀 ᴍᴀss ᴘᴜʀɢᴇ ᴀᴄᴛɪᴠᴀᴛᴇᴅ 💀
╚═══════════════════════════════════════════╝

⚡ ᴘʀᴇᴘᴀʀɪɴɢ ᴛᴏ ʙᴀɴɪsʜ ${nonAdmins.length} sᴏᴜʟs...

☠️ "ᴛʜᴇ ᴡᴇᴀᴋ sʜᴀʟʟ ʙᴇ ᴘᴜʀɢᴇᴅ" ☠️

⏳ ᴇxᴇᴄᴜᴛɪɴɢ ɪɴ 5 sᴇᴄᴏɴᴅs...

╰────────────────────────────────────────╯` 
      });
      
      // Wait 5-10 seconds before executing
      const waitTime = 5000 + Math.floor(Math.random() * 5000); // Random 5-10 seconds
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Extract all participant IDs to kick
      const participantIds = nonAdmins.map(p => p.id);
      
      let kicked = 0;
      let failed = 0;
      
      try {
        // KICK ALL AT ONCE - NO LOOP!
        await sock.groupParticipantsUpdate(groupId, participantIds, 'remove');
        kicked = participantIds.length;
        
        console.log(`✅ Successfully kicked ${kicked} members at once`);
        
      } catch (e) {
        console.error('Mass kick failed, attempting individual kicks:', e);
        
        // Fallback: If mass kick fails, kick in batches of 10 (still faster than 1 by 1)
        const batchSize = 10;
        for (let i = 0; i < participantIds.length; i += batchSize) {
          const batch = participantIds.slice(i, i + batchSize);
          
          try {
            await sock.groupParticipantsUpdate(groupId, batch, 'remove');
            kicked += batch.length;
            
            // Small delay between batches only (not between individuals)
            if (i + batchSize < participantIds.length) {
              await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 sec between batches
            }
          } catch (batchError) {
            console.error('Batch kick failed:', batchError);
            failed += batch.length;
          }
        }
      }
      
      // Send completion message
      await sock.sendMessage(groupId, { 
        text: `╔═══════════════════════════════════════════╗
║ 👿 ᴘᴜʀɢᴇ ᴄᴏᴍᴘʟᴇᴛᴇ 👿
╚═══════════════════════════════════════════╝

✅ ʙᴀɴɪsʜᴇᴅ: ${kicked} sᴏᴜʟs
${failed > 0 ? `⛔ ғᴀɪʟᴇᴅ: ${failed} sᴏᴜʟs` : ''}

☠️ "ᴛʜᴇ ʀᴇᴀʟᴍ ɪs ᴄʟᴇᴀɴsᴇᴅ" ☠️

👿 ᴏɴʟʏ ᴛʜᴇ sᴛʀᴏɴɢ ʀᴇᴍᴀɪɴ

╰────────────────────────────────────────╯` 
      });
      
    } catch (e) {
      console.error('KICKALL ERROR:', e);
      await sock.sendMessage(groupId, { 
        text: '❌ ᴘᴜʀɢᴇ ғᴀɪʟᴇᴅ!\n\n⚠️ ᴄʜᴇᴄᴋ ɪғ ʙᴏᴛ ɪs ᴀᴅᴍɪɴ.' 
      });
    }
  }
};