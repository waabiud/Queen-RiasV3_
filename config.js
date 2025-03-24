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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0FTdkl5NnZuS3FVbTNpWHRKbnlwdW9xODkyUTRoWENmeFNRUEdoQ3dIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWtDcExZaEQ4YmR4TWh6UHRYRG1BYXlQYmZvQXlCVExpMFFFeDVsZ1FsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5THQ1UzZXNkhtUEZ2RzA0RElLMlY5NXR6TUtRbjUydzJHanZFbEdBMUhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXa2pldGFFb01HWE0rb1MwVFB0RmVwRVBRYUxKZ1ZlUmduY1lHVGxPblZJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFIMDczQWQ2NVFoVHpOTGNGUGFsNHlCMmt4VU00VUtMbHZjZWY4SHBnMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRHdnYwSThUdFJSaHVlWW1nakZ1ODdaQXdNOWsyZEk4WlFWQ3pleGE1SEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0o3VDduV0lRMlZJemFYUHNKZ0xQamtmZUZYdURDUzE2dlVOYnVJZnlGcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTJUaEhlUG9rdlN4TXk4VnpXaGhuT3orWXNXREVzN1R5YkVhdjN2RjhTND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpUVjF2QkJFKzFnME9ncjVzUytoNkxCM3VPZXB2Uk5ZTlpRWGYzVVBNRnplU0ZCSCtiWUpCWWVoY21oT00rR3FZaGJUbjJTWU1aT3R4eE5MK1U5V0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiJLZllsUGRUMXM2SzJNcGM4UzdIZGtmSnJNZmlZc0tIbEhOckFqUmw2Q0FnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJXWkhESE5XVCIsIm1lIjp7ImlkIjoiMjU0MTE0NzY1NDAxOjEwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNlZW5ldCBUZWNobm9sb2dpZXMiLCJsaWQiOiIyNTQ3NTY0ODg1MTU3MjE6MTBAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLL28zWjhHRUtiN2hMOEdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJSNzZMUU1XUDE4YXNoaFFSODFCcmM5QXhwb1BPWmpJRDFaUm02SEVUWldzPSIsImFjY291bnRTaWduYXR1cmUiOiJTaG9Tem9HWVg5ak1JeEVrb1ZkMzF5SG9OdHFjQ0xQL3d4S3c3K1BlL3lJdy93U0c4cUJSaURpK3NaVjRDMFhKZFlTa29PendBM0g4RUNYT0ZtVjNBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiby8zRGEzdXY0NlpYMWwraGNSVzRxMkFSU0RSWTNEYXBLclF1a1RDNmRGMFVSWlN2WHZEaTNocUo1Nk1CQ245Q1FESm90ZmVVRytXVlpuSkNMODlrQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMTQ3NjU0MDE6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVWUraTBERmo5ZkdySVlVRWZOUWEzUFFNYWFEem1ZeUE5V1VadWh4RTJWciJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyODE0NjQ1LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUifQ==",
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
