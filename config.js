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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkwyOXE1VSt5VlEwaVpSNnNhZkJaQXBiNXc0UnVXOHdEMEFmTlpQbnBXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2Z6blBHQURvSjR0cFo2U1RheGtkYWFnTmxPQjYveTJqeUxGaEU0NFkwMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFUHdQd2E1aTJyK1VCOVluejNXakd6M0lyM1M5VjZsWFBqankwbERORlZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1UlZkZmhWQ0RMdXYyZnZtNDBuN1dmVnZKQWl2REd2RzVVTG9qWllaY2dNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNFY2RnWUluVzVCOUxFd0Q0SWpSOHY2TlJ2cVA0U2J6clVjcHpkZy9lMW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJFM0hrY2dLOVBBNmgrSG1SeFVFRXF3WmdtVUNBclJxTlUrMkROTVQ3QlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY05ZTjFjTEtFOWVEZ0tKVzhYNVRwakdrUjJBNUcvWUZZNURpTmJVemMwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnNMelNYYUQ3cjdPUFh1SHlvLzdkRlZUUUhDbDZpNkpUMDA2V0VwMitpND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZOdjhCWFdFOW4vaGEzQlpEeXJyYnNXa1NvNXl4QzNkekN3aTBiTDkzalJKUUZNNWpHRkl6L1A4Q0dDclRTTHkzaEVyVnd3dVlPYlNnb2tGODV6U0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMzLCJhZHZTZWNyZXRLZXkiOiJ2SzBsVTRLQjJoa0NONm1DR0o3S1g5NDFVNmcrZjFMZlB3WHllV2E3eHhBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDExNDc2NTQwMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxM0FCN0E4RjczNjg1MzFBODk0Rjg4RkM5NjUyQzc5MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQyMTU1MzY3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGMlBYTUxZRyIsIm1lIjp7ImlkIjoiMjU0MTE0NzY1NDAxOjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ2VlbmV0IFRlY2hub2xvZ2llcyIsImxpZCI6IjI1NDc1NjQ4ODUxNTcyMTo3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzdvM1o4R0VOZmMzTDRHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUjc2TFFNV1AxOGFzaGhRUjgxQnJjOUF4cG9QT1pqSUQxWlJtNkhFVFpXcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibHRGNmcrT1F6S05GdHNPdUxTd1EyaVFYdHQxWHRCZzZLcTJPNjBWVEtEQ2EwaUZrRWlqZGJkZWlaMWxsbzYzQXIvNEZUamRkNG1jdGRlY1Y1djg1Q3c9PSIsImRldmljZVNpZ25hdHVyZSI6Impha0JqeWo3Ym9SL1lWS0NXQytYUDNPNFByM3JTemxVUWcrU1c2cnNHSUlndEpJdTN0MnNDRDNPb1pKZ3JZc0wwRm9aUmduMWF3UkVtZDZGZ3ZQZ0FBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTE0NzY1NDAxOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVWUraTBERmo5ZkdySVlVRWZOUWEzUFFNYWFEem1ZeUE5V1VadWh4RTJWciJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyMTU1MzY0LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdmVCJ9
	
",
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
