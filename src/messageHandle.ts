import Users from "./user";
import talk from "./turing/index";

const messageHandle = async (message: any, users: Users) => {
  if (message.self()) {
    return;
  }
  const contact = message.from();
  let msgText = message.text();
  if (/^help$/i.test(msgText)) {
    message.say(`
回复以下代码,执行对应的功能:
"wx:phone" : 获取个人联系方式,
"wx:mail" : 获取个人邮箱,
"wx:ding [你要说的内容]" : 转发信息到主号,
`);
  } else if (/^wx:/i.test(msgText)) {
    let [, action, text] = /^wx:(.*) (.*)/.exec(msgText);
    switch (action) {
      case "phone":
        message.say(`急事请拨打: 13175099932`);
        break;
      case "mail":
        message.say(`个人邮箱: daichangchun8@163.com`);
        break;
      case "ding":
        if (contact.name() !== "GodD") {
          let userGodD = await users.find("GodD");
          let text = /^wx:ding (.*)/.exec(msgText)[1];
          userGodD.say(`${contact.name()}: ${text}`);
        }
        break;
      default:
        // 转发给发件人
        let user = await users.find(action);
        user && user.say(`${text}`);
        break;
    }
  } else {
    talk(msgText).then(async text => {
      contact.say(text);
    });
  }
};

export default messageHandle;
