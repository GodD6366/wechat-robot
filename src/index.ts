import messageHandle from './messageHandle';
const { Wechaty } = require('wechaty');
const qrcode = require('qrcode-terminal');
import mySchedule from './schedule/index';
import Users from './user/index';

const bot = new Wechaty();
const users = new Users(bot);

bot.on('scan', (url: string, code: string) => {
    const loginUrl = url.replace('qrcode', 'l');
    qrcode.generate(loginUrl);
    console.log(`Scan QR Code to login: ${code}\n${url}`);
})
    .on('login', async (user: any) => {
        console.log(`User ${user} logined`);
        mySchedule(bot, users);
    })
    .on('message', async (message: any) => {
        let from = message.from().name();
        let to = message.to().name();
        console.log(`Message: ${message.text()}, From: ${from}, to: ${to}`);
        if (to !== 'GodD') {
            messageHandle(message, users);
        }
    });

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
});

bot.start();
