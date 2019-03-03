import Users from './user';

let user: any;

const messagehandle = async (message: any, users: Users) => {
    if (/^ding$/i.test(message.text())) {
        message.say(
            `回复以下代码,执行对应的功能:\n"wx:phone" : 获取个人联系方式,\n"wx:mail" : 获取个人邮箱`
        );
    } else if (/^wx:phone$/i.test(message.text())) {
        message.say(`急事请拨打: 13175099932`);
    } else if (/^wx:mail$/i.test(message.text())) {
        message.say(`个人邮箱: daichangchun8@163.com`);
    } else {
        if (message.self()) {
            return;
        }

        const contact = message.from();
        if (contact.name() !== 'GodD') {
            user = contact;
            let userGodD = await users.find('GodD');
            userGodD.say(`${contact.name()}: ${message.text()}`);
        } else {
            // 转发给发件人
            user.say(`${message.text()}`);
        }
    }
};

export default messagehandle;
