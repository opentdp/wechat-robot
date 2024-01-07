import * as config from '../library/config.js';
import * as wechat from '../library/wechat.js';

export default async function (sender, content, roomid) {

    if (!config.AdminList.includes(sender)) {
        return '抱歉，你没有权限';
    }

    const [cmd, ...args] = content.split(' ');

    switch (cmd) {
        case 'BAN':
            banUser(args[0], args[1]);
            return '已禁止该用户使用智能回复';
        default:
            return '未注册指令';
    }

}

function banUser(name, roomid) {

    const info = wechat.getInfoByName(name, roomid);

    if (info) {
        config.ResponsiveList.push(info.wxid);
    }

}
