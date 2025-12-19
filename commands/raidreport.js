const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const proxyManager = require('../lib/proxy-manager');
const { HttpsProxyAgent } = require('https-proxy-agent');

// Global queue and active jobs
if (!global.raidReportQueue) {
  global.raidReportQueue = [];
}
if (!global.raidReportActive) {
  global.raidReportActive = {};
}

module.exports = {
  name: 'raidreport',
  aliases: [''],
  description: 'Send email raids to targets',
  ownerOnly: true,
  groupOnly: false,
  telegramOnly: true,

  async execute(sock, msg, args, { sender, chatId }) {
    return await sock.sendMessage(chatId, { 
      text: `╔═══════════════════════════════════════════╗
║ 📢 ʀᴀɪᴅʀᴇᴘᴏʀᴛ - ᴛᴇʟᴇɢʀᴀᴍ ᴏɴʟʏ 📢
╚═══════════════════════════════════════════╝

⛔ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ᴏɴ ᴛᴇʟᴇɢʀᴀᴍ!

📱 ᴜsᴇ /raidreport <number> ᴏɴ ᴛᴇʟᴇɢʀᴀᴍ
   ᴛᴏ ᴇxᴇᴄᴜᴛᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.

👿 "ᴛʜᴇ ʀᴀɪᴅ ɪs ᴅɪɢɪᴛᴀʟ" ☠️
╰────────────────────────────────────────╯` 
    });
  },

  telegramExecute: async function(telegramBot, chatId, target) {
    // Handle stop command
    if (target && target.toLowerCase() === 'stop') {
      if (global.raidReportActive[chatId]) {
        global.raidReportActive[chatId].stopped = true;
        delete global.raidReportActive[chatId];
        
        // Remove from queue if exists
        global.raidReportQueue = global.raidReportQueue.filter(job => job.chatId !== chatId);
        
        return telegramBot.sendMessage(chatId, 
          `╔═══════════════════════════════════════════╗
║ 🛑 ʀᴀɪᴅʀᴇᴘᴏʀᴛ sᴛᴏᴘᴘᴇᴅ 🛑
╚═══════════════════════════════════════════╝

✅ ʀᴇᴘᴏʀᴛɪɴɢ ᴘʀᴏᴄᴇss sᴛᴏᴘᴘᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ

👿 "ᴛʜᴇ ʀᴀɪᴅ ʜᴀs ᴄᴇᴀsᴇᴅ" ☠️
╰────────────────────────────────────────╯`
        );
      } else {
        return telegramBot.sendMessage(chatId, 
          `⚠️ ɴᴏ ᴀᴄᴛɪᴠᴇ ʀᴇᴘᴏʀᴛɪɴɢ ᴘʀᴏᴄᴇss ғᴏᴜɴᴅ ᴛᴏ sᴛᴏᴘ.`
        );
      }
    }

    // Validate target number
    if (!target) {
      return telegramBot.sendMessage(chatId, 
        `╔═══════════════════════════════════════════╗
║ 📧 ʀᴀɪᴅʀᴇᴘᴏʀᴛ - ᴇᴍᴀɪʟ ʀᴀɪᴅᴇʀ 📧
╚═══════════════════════════════════════════╝

⛔ ᴍɪssɪɴɢ ᴛᴀʀɢᴇᴛ ɴᴜᴍʙᴇʀ

📱 ᴜsᴀɢᴇ: /raidreport <ɴᴜᴍʙᴇʀ>
🛑 sᴛᴏᴘ: /raidreport stop

💡 ᴇxᴀᴍᴘʟᴇ: /raidreport 1234567890`
      );
    }

    if (!/^\d+$/.test(target)) {
      return telegramBot.sendMessage(chatId, 
        `⛔ ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ ғᴏʀᴍᴀᴛ.\n\n📱 ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ ᴡɪᴛʜᴏᴜᴛ sʏᴍʙᴏʟs.`
      );
    }

    // Check if already in queue or active
    const isActive = global.raidReportActive[chatId];
    const isInQueue = global.raidReportQueue.some(job => job.chatId === chatId);

    if (isActive || isInQueue) {
      const queuePosition = global.raidReportQueue.findIndex(job => job.chatId === chatId) + 1;
      return telegramBot.sendMessage(chatId, 
        `⚠️ ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ᴀɴ ᴀᴄᴛɪᴠᴇ ʀᴀɪᴅ ${queuePosition > 0 ? `ɪɴ ǫᴜᴇᴜᴇ (ᴘᴏsɪᴛɪᴏɴ #${queuePosition})` : 'ʀᴜɴɴɪɴɢ'}\n\n🛑 ᴜsᴇ /raidreport stop ᴛᴏ ᴄᴀɴᴄᴇʟ ɪᴛ.`
      );
    }

    // Add to queue
    const job = {
      chatId: chatId,
      target: target,
      addedAt: Date.now()
    };

    global.raidReportQueue.push(job);

    // If no active raid, start processing immediately
    if (Object.keys(global.raidReportActive).length === 0) {
      await processNextJob(telegramBot);
    } else {
      const queuePosition = global.raidReportQueue.length;
      await telegramBot.sendMessage(chatId, 
        `╔═══════════════════════════════════════════╗
║ ⏳ ᴀᴅᴅᴇᴅ ᴛᴏ ǫᴜᴇᴜᴇ ⏳
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: +${target}
📊 ǫᴜᴇᴜᴇ ᴘᴏsɪᴛɪᴏɴ: #${queuePosition}
⏰ ᴇsᴛɪᴍᴀᴛᴇᴅ ᴡᴀɪᴛ: ~${queuePosition * 35} ᴍɪɴᴜᴛᴇs

💬 ʏᴏᴜ'ʟʟ ʙᴇ ɴᴏᴛɪғɪᴇᴅ ᴡʜᴇɴ ʏᴏᴜʀ ʀᴀɪᴅ sᴛᴀʀᴛs!
👿 "ᴘᴀᴛɪᴇɴᴄᴇ ɪs ᴀ ᴅᴇᴍᴏɴ's ᴠɪʀᴛᴜᴇ" ☠️`
      );
    }
  }
};

// Process jobs from queue
async function processNextJob(telegramBot) {
  if (global.raidReportQueue.length === 0) {
    return; // No jobs in queue
  }

  const job = global.raidReportQueue.shift();
  const { chatId, target } = job;

  // Mark as active
  global.raidReportActive[chatId] = {
    target: target,
    stopped: false,
    startTime: Date.now()
  };

  await telegramBot.sendMessage(chatId, 
    `╔═══════════════════════════════════════════╗
║ 🚀 ʀᴀɪᴅ sᴛᴀʀᴛɪɴɢ 🚀
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: +${target}
📧 ᴍᴀx ᴇᴍᴀɪʟs: 100
⏰ ᴄᴏᴏʟᴅᴏᴡɴ: 20s ᴘᴇʀ ᴡᴀᴠᴇ
🔄 ʟᴏᴀᴅɪɴɢ sʏsᴛᴇᴍs...

👿 "ʟᴇᴛ ᴛʜᴇ ʀᴀɪᴅ ʙᴇɢɪɴ" ☠️`
  );

  try {
    await executeRaid(telegramBot, chatId, target);
  } catch (error) {
    console.error('Raid execution error:', error);
    await telegramBot.sendMessage(chatId, 
      `❌ ʀᴀɪᴅ ғᴀɪʟᴇᴅ: ${error.message}`
    );
  } finally {
    // Clean up and process next job
    delete global.raidReportActive[chatId];
    
    // Wait 5 seconds before processing next job
    setTimeout(() => {
      processNextJob(telegramBot);
    }, 5000);
  }
}

// Main raid execution
async function executeRaid(telegramBot, chatId, target) {
  try {
    // Load Gmail accounts
    const gmailAccountsPath = path.join(__dirname, '..', 'gmail-accounts.json');
    const gmailAccounts = JSON.parse(await fs.readFile(gmailAccountsPath, 'utf8'));

    if (!gmailAccounts || gmailAccounts.length === 0) {
      throw new Error('No Gmail accounts found in gmail-accounts.json');
    }

    // Load target emails
    const targetEmailsPath = path.join(__dirname, '..', 'target-emails.json');
    const targetData = JSON.parse(await fs.readFile(targetEmailsPath, 'utf8'));
    const targetEmails = targetData.targets;

    if (!targetEmails || targetEmails.length === 0) {
      throw new Error('No target emails found in target-emails.json');
    }

    // Load email templates
    const emailsDir = path.join(__dirname, '..', 'emails');
    const emailFiles = await fs.readdir(emailsDir);
    const emailTemplates = [];

    for (const file of emailFiles) {
      if (file.endsWith('.txt')) {
        const content = await fs.readFile(path.join(emailsDir, file), 'utf8');
        emailTemplates.push(content);
      }
    }

    if (emailTemplates.length === 0) {
      throw new Error('No email templates found in emails/ folder');
    }

    // Send initial progress message
    const progressMsg = await telegramBot.sendMessage(chatId, 
      `╔═══════════════════════════════════════════╗
║ 📊 ʀᴀɪᴅ ᴘʀᴏɢʀᴇss 📊
╚═══════════════════════════════════════════╝

📧 sᴇɴᴅɪɴɢ: 0/100
📬 ɢᴍᴀɪʟ: ʟᴏᴀᴅɪɴɢ...
✅ sᴜᴄᴄᴇss: 0
❌ ғᴀɪʟᴇᴅ: 0
⏱️ ᴇʟᴀᴘsᴇᴅ: 0s

🔄 ɪɴɪᴛɪᴀʟɪᴢɪɴɢ...`
    );

    let emailsSent = 0;
    let successCount = 0;
    let failCount = 0;
    const maxEmails = 100;
    const startTime = Date.now();

    // Send emails
    for (let i = 0; i < maxEmails; i++) {
      // Check if stopped
      if (global.raidReportActive[chatId]?.stopped) {
        await telegramBot.editMessageText(
          `╔═══════════════════════════════════════════╗
║ 🛑 ʀᴀɪᴅ sᴛᴏᴘᴘᴇᴅ 🛑
╚═══════════════════════════════════════════╝

📧 sᴇɴᴛ: ${emailsSent}/100
✅ sᴜᴄᴄᴇss: ${successCount}
❌ ғᴀɪʟᴇᴅ: ${failCount}

👿 "ᴛʜᴇ ʀᴀɪᴅ ᴡᴀs ɪɴᴛᴇʀʀᴜᴘᴛᴇᴅ" ☠️`,
          { chat_id: chatId, message_id: progressMsg.message_id }
        );
        return;
      }

      // Select random Gmail account
      const gmailAccount = gmailAccounts[Math.floor(Math.random() * gmailAccounts.length)];
      
      // Select random email template
      const template = emailTemplates[Math.floor(Math.random() * emailTemplates.length)];
      
      // Replace $(number) with target
      const emailContent = template.replace(/\$\(number\)/g, target);
      
      // Extract subject and body
      const subjectMatch = emailContent.match(/Subject: (.+)/);
      const subject = subjectMatch ? subjectMatch[1] : 'Security Alert';
      const body = emailContent.replace(/Subject: .+\n\n/, '');

      // Select random target email
      const toEmail = targetEmails[Math.floor(Math.random() * targetEmails.length)];

      // Get proxy
      let proxy = null;
      try {
        if (proxyManager && typeof proxyManager.getRandomProxy === 'function') {
          proxy = proxyManager.getRandomProxy();
        }
      } catch (err) {
        console.log('Proxy manager unavailable, continuing without proxy');
      }

      // Send email
      try {
        await sendEmail(gmailAccount, toEmail, subject, body, proxy);
        successCount++;
      } catch (error) {
        console.error(`Email send failed:`, error.message);
        failCount++;
      }

      emailsSent++;

      // Update progress every email
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const gmailDisplay = gmailAccount.email.substring(0, 20) + '...';
      
      await telegramBot.editMessageText(
        `╔═══════════════════════════════════════════╗
║ 📊 ʀᴀɪᴅ ᴘʀᴏɢʀᴇss 📊
╚═══════════════════════════════════════════╝

📧 sᴇɴᴅɪɴɢ: ${emailsSent}/100
📬 ɢᴍᴀɪʟ: ${gmailDisplay}
✅ sᴜᴄᴄᴇss: ${successCount}
❌ ғᴀɪʟᴇᴅ: ${failCount}
⏱️ ᴇʟᴀᴘsᴇᴅ: ${elapsed}s

${emailsSent % 10 === 0 ? '⏳ ᴄᴏᴏʟᴅᴏᴡɴ 20s...' : '🔄 sᴇɴᴅɪɴɢ...'}`,
        { chat_id: chatId, message_id: progressMsg.message_id }
      );

      // 20 second cooldown every 10 emails
      if (emailsSent % 10 === 0 && emailsSent < maxEmails) {
        await sleep(20000);
      } else {
        await sleep(2000); // 2 second delay between individual emails
      }
    }

    // Final message
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    await telegramBot.editMessageText(
      `╔═══════════════════════════════════════════╗
║ ✅ ʀᴀɪᴅ ᴄᴏᴍᴘʟᴇᴛᴇ ✅
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: +${target}
📧 ᴛᴏᴛᴀʟ sᴇɴᴛ: ${emailsSent}/100
✅ sᴜᴄᴄᴇss: ${successCount}
❌ ғᴀɪʟᴇᴅ: ${failCount}
⏱️ ᴛᴏᴛᴀʟ ᴛɪᴍᴇ: ${Math.floor(totalTime / 60)}m ${totalTime % 60}s

👿 "ᴛʜᴇ ʀᴀɪᴅ ɪs ᴄᴏᴍᴘʟᴇᴛᴇ" ☠️`,
      { chat_id: chatId, message_id: progressMsg.message_id }
    );

  } catch (error) {
    throw error;
  }
}

// Send individual email
async function sendEmail(gmailAccount, toEmail, subject, body, proxy) {
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: gmailAccount.email,
      pass: gmailAccount.password
    }
  };

  // Add proxy if available
  if (proxy) {
    try {
      const proxyAgent = new HttpsProxyAgent(proxy);
      transportConfig.proxy = proxyAgent;
    } catch (err) {
      console.log('Proxy setup failed, sending without proxy');
    }
  }

  const transporter = nodemailer.createTransport(transportConfig);

  const mailOptions = {
    from: gmailAccount.email,
    to: toEmail,
    subject: subject,
    text: body
  };

  await transporter.sendMail(mailOptions);
}

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}