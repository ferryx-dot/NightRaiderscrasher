const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../database/antidelete.json');
const messageStore = new Map();
const MAX_MESSAGES = 1000;

const loadConfig = () => {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading antidelete config:', e);
  }
  return { enabled: false };
};

const saveConfig = (config) => {
  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('Error saving antidelete config:', e);
  }
};

const handleIncomingMessage = (msg) => {
  try {
    if (!msg.message || !msg.key?.id) return;
    
    const text = msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption || '';
    
    if (!text) return;
    
    if (messageStore.size >= MAX_MESSAGES) {
      const oldestKey = messageStore.keys().next().value;
      messageStore.delete(oldestKey);
    }
    
    messageStore.set(msg.key.id, {
      text,
      sender: msg.key.participant || msg.key.remoteJid,
      chatId: msg.key.remoteJid,
      timestamp: Date.now()
    });
  } catch (e) {
    console.error('Error storing message:', e);
  }
};

const handleMessageRevocation = async (sock, update, ownerJid) => {
  try {
    const messageId = update.key?.id;
    if (!messageId) return;
    
    const storedMessage = messageStore.get(messageId);
    if (!storedMessage) return;
    
    const { text, sender, chatId } = storedMessage;
    
    const notification = `🗑️ *ᴅᴇʟᴇᴛᴇᴅ ᴍᴇssᴀɢᴇ ᴅᴇᴛᴇᴄᴛᴇᴅ*

👤 *ғʀᴏᴍ:* ${sender.split('@')[0]}
💬 *ᴄʜᴀᴛ:* ${chatId.split('@')[0]}
📝 *ᴍᴇssᴀɢᴇ:* ${text}
⏰ *ᴛɪᴍᴇ:* ${new Date().toLocaleString()}`;

    await sock.sendMessage(ownerJid, { text: notification });
    
    messageStore.delete(messageId);
  } catch (e) {
    console.error('Error handling message revocation:', e);
  }
};

module.exports = {
  name: 'antidelete',
  aliases: ['ad', 'antirevoke'],
  description: 'Toggle antidelete feature to capture deleted messages',
  ownerOnly: true,
  
  loadConfig,
  handleIncomingMessage,
  handleMessageRevocation,
  
  async execute(sock, msg, args, ctx) {
    const { chatId, isOwner } = ctx;
    
    if (!isOwner) {
      return sock.sendMessage(chatId, { text: '❌ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ!' });
    }
    
    const config = loadConfig();
    const action = args[0]?.toLowerCase();
    
    if (action === 'on' || action === 'enable') {
      config.enabled = true;
      saveConfig(config);
      return sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ 👿 ɴɪɢʜᴛ ʀᴀɪᴅᴇʀ⭒ ˣᴰ ⭒ 👿
╚═══════════════════════════════════════════╝

✅ *ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴇɴᴀʙʟᴇᴅ*

ᴅᴇʟᴇᴛᴇᴅ ᴍᴇssᴀɢᴇs ᴡɪʟʟ ɴᴏᴡ ʙᴇ sᴇɴᴛ ᴛᴏ ʏᴏᴜ.

╰────────────────────────────────────────╯` 
      });
    }
    
    if (action === 'off' || action === 'disable') {
      config.enabled = false;
      saveConfig(config);
      return sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ 👿 ɴɪɢʜᴛ ʀᴀɪᴅᴇʀ⭒ ˣᴰ ⭒ 👿
╚═══════════════════════════════════════════╝

❌ *ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴅɪsᴀʙʟᴇᴅ*

ᴅᴇʟᴇᴛᴇᴅ ᴍᴇssᴀɢᴇs ᴡɪʟʟ ɴᴏᴛ ʙᴇ ᴛʀᴀᴄᴋᴇᴅ.

╰────────────────────────────────────────╯` 
      });
    }
    
    return sock.sendMessage(chatId, { 
      text: `╔═══════════════════════════════════════════╗
║ 👿 ɴɪɢʜᴛ ʀᴀɪᴅᴇʀ⭒ ˣᴰ ⭒ 👿
╚═══════════════════════════════════════════╝

🗑️ *ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴄᴏᴍᴍᴀɴᴅ*

*sᴛᴀᴛᴜs:* ${config.enabled ? '✅ ᴇɴᴀʙʟᴇᴅ' : '❌ ᴅɪsᴀʙʟᴇᴅ'}
*sᴛᴏʀᴇᴅ:* ${messageStore.size} ᴍᴇssᴀɢᴇs

*ᴜsᴀɢᴇ:*
• .antidelete on - ᴇɴᴀʙʟᴇ ᴛʀᴀᴄᴋɪɴɢ
• .antidelete off - ᴅɪsᴀʙʟᴇ ᴛʀᴀᴄᴋɪɴɢ

╰────────────────────────────────────────╯` 
    });
  }
};
