const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZocU9hS0pCL09xUnNLd1BZSWtWd0pnN3pRR0pZcklweGhwWExzd0tuMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnZBc3E3ZlI3dWhzOUtjS3J1QVhIMVI2T2ZMQUZ3di9PS2loc2lRTFR3OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPT25rbVZiQ2lWVkxobzIvZFBVK2hMcDd0cFMrdUVzWXNtRkVLYkZtOTFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWSzZwQkNLcU80eGU2MmlIbFg3U1RFWGRhYURUcXB4c3MyVzU5M0NIbG5rPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdFamJLSWJydTBxUGdJSDdwUXI5SktZdDgyN0t3UjNnUmp3dWNySUtza1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9lM2NNc1hxMWpYaGRuRFFURWFoVEpDcUJlSm1YMGFjdEU1aEFrL0dGUnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic09taXB6VHZnZFRScVd5WHBZTFB3MC9aUGRBRVFLQWcxR2JzQmJjTUUyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUhZS0l1WjhuSDlSM29rdlNnaUhVYkFWZDAvVlJIV3ArV3F3MEJod3drUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImptM1V4QzZLb0s1VFZXcmlJMVZRSTVwaXR0RE54ZHJTU1BVMEI2U2dHamptbVBxSW1VVkVKS1I1cEljazh0anprOEwwbDNvYnFMUFlLbFJrcDJ2aUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiJaL0JsMm54M0JFS2tieVhPUnozUVQ5NFV3YzFWMncvRnJzUlpkTjhWeVpRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJDWFk0RVlMSiIsIm1lIjp7ImlkIjoiMjU0MTE0NzY1NDAxOjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNlZW5ldCBUZWNobm9sb2dpZXMiLCJsaWQiOiIyNTQ3NTY0ODg1MTU3MjE6MTFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLL28zWjhHRU5DM2hiOEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJSNzZMUU1XUDE4YXNoaFFSODFCcmM5QXhwb1BPWmpJRDFaUm02SEVUWldzPSIsImFjY291bnRTaWduYXR1cmUiOiJkbFVPTGdvMEFnNWdhYTJzcHUvU3d3a09KS0FocWl6cTV0SStNTE9zVkZkNFB2YlBtc0ZSM0pHRnJ2VU9hazFUMnRsZmtQNnR6RDhjNWdwc2dZdEtCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSWd4WEplVHdFaUpnL3d1cFlDanN4anVKditPRmFEY2NMTDRkVVhRQW8va05BUnlZQ3daaklhMUVkb3VoWnRURlhKaFRMQ21jdHFMU0tVZHFodUFzQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMTQ3NjU0MDE6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVWUraTBERmo5ZkdySVlVRWZOUWEzUFFNYWFEem1ZeUE5V1VadWh4RTJWciJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyODIyMzY2LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU15byJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
