// By Wildy8283 / Wildy Sheverando

const axios = require('axios');
const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const client = new Client({
    puppeteer: {args: ['--no-sandbox'],},
    authStrategy: new LocalAuth()
});
const Prefix = '/chat'

console.log("Connecting to whatsapp..");

client.on('qr', qr => {
    console.clear();
    console.log("Scan this QR Code to login");
    qrcode.generate(qr, {small: true});
});

client.on("authenticated", (session) => {
    console.clear();
    console.log("Success Login to whatsapp !");
});

client.on('ready', () => {
    console.clear();
    console.log("Bot telah berjalan");
});

client.on("message", async (message) => {
    try {
        if((await message.getChat()).isGroup) {
            if(message.body.startsWith(Prefix)) {
                const message2 = message.body.replace(`${Prefix} `, "");
                if (!message.isMedia && !message.isForwarded) {
                    if(message2 == '/chat' || message2 == '') {
                        message.reply("Apa pertanyaan mu masbro ???");
                        return;
                    } else {
                        message.reply(`Bentar masbro pertanyaanmu\n\n${message2}\n\nSedang di proses masbro`)
                        axios.post("http://127.0.0.1:2824/chat", {
                            input: message2
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })                
                        .then(function (response) {
                            message.reply(response.data.response);
                        })
                        .catch(function (error) {
                            console.log("Cannot connect to server")
                        })
                    }
                } else {
                    console.log("Access received but no text and ignored");
                }
            }
        } else {
            console.log("Access from private chat and ignored !");
        }
    } catch (err) {
        console.log(err)
    } 
});

client.initialize();
