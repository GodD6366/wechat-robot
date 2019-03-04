import Users from './user';
import talk from './turing/index';

const messagehandle = async (message: any, users: Users) => {
    if (message.self()) {
        return;
    }
    const contact = message.from();
    if (/^help$/i.test(message.text())) {
        message.say(`
回复以下代码,执行对应的功能:
"wx:phone" : 获取个人联系方式,
"wx:mail" : 获取个人邮箱,
"wx:ding [你要说的内容]" : 转发信息到主号,
`);
    } else if (/^wx:phone$/i.test(message.text())) {
        message.say(`急事请拨打: 13175099932`);
    } else if (/^wx:mail$/i.test(message.text())) {
        message.say(`个人邮箱: daichangchun8@163.com`);
    } else if (/^wx:ding/i.test(message.text())) {
        if (contact.name() !== 'GodD') {
            let userGodD = await users.find('GodD');
            let text = /^wx:ding (.*)/.exec(message.text())[1];
            userGodD.say(`${contact.name()}: ${text}`);
        } else {
            // 转发给发件人
            let [, userName, text] = /^wx:(.*) (.*)/.exec(message.text());
            let user = await users.find(userName);
            user && user.say(`${text}`);
        }
    } else {
        talk(message.text()).then(async text => {
            contact.say(text);
        });
    }
};

export default messagehandle;
