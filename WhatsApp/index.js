// ----------------------------------------------------------------------------
// Name         : GPT-Bot | WhatsApp
// Desc         : Simple WhatsApp Bot Using Whatsapp-Web.Js Library
// Author       : Wildy Sheverando [Wildy8283]
// Date         : 26-03-2023
// License      : GNU General Public License V3
// License Link : https://raw.githubusercontent.com/wildy8283/lcn/main/gplv3
// ----------------------------------------------------------------------------

// Import required libraries
const Prefix = "/chat"; // you can change this prefix
const axios = require("axios");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

// Initialize the client
const client = new Client({
    puppeteer: {
        args: ["--no-sandbox"],
    },
    authStrategy: new LocalAuth(),
});

console.log("Connecting to WhatsApp...");

// Output QR code for session login
client.on("qr", (qr) => {
    console.clear();
    console.log("Scan this QR code to login:");
    qrcode.generate(qr, { small: true });
});

// If authenticated, log success message
client.on("authenticated", (session) => {
    console.clear();
    console.log("Successfully logged in to WhatsApp!");
});

// If ready, log ready message
client.on("ready", () => {
    console.clear();
    console.log("Bot is now running.");
});

// Handle incoming messages
client.on("message", async (message) => {
    try {
        // Check if message is from a group
        if ((await message.getChat()).isGroup) {
            // Check if message starts with the specified prefix
            if (message.body.startsWith(Prefix)) {
                // Remove prefix from the message
                const message2 = message.body.replace(`${Prefix} `, "");

                // Check if message is not media or forwarded
                if (!message.isMedia && !message.isForwarded) {
                    // Check if message is empty or contains only the prefix
                    if (message2 == "/chat" || message2 == "") {
                        // If message is empty, prompt user for question
                        await message.reply("Apa pertanyaanmu, Mas Bro?");
                        return
                    } else {
                        // If message contains a question, process it
                        // const message.reply(`Bentar Mas Bro, pertanyaanmu:\n\n${message2}\n\nSedang diproses...`);
                        axios.post("http://127.0.0.1:2824/chat", // this request to python api
                            { input: message2 },
                            { headers: {'Content-Type': 'application/json'} }
                        )
                        .then(async function (response) {
                            await message.reply(response.data.response); // send response from the API
                        })
                        .catch(function (error) {
                            console.log("Cannot connect to server.");
                        });
                    }
                } else {
                    console.log("Prefix received, but message is media / img / sticker.");
                }
            }
        } else {
            console.log("Access from private chat was ignored.");
        }
    } catch (err) {
        console.log(err);
    }
});

// Start the client
client.initialize();
