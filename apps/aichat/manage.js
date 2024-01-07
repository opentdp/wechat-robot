import * as config from '../library/config.js';
import * as wechat from '../library/wechat.js';

export default async function (sender, content, roomid) {

    if (!config.AdminList.includes(sender)) {
        return '抱歉，你没有权限';
    }

    const [cmd, ...args] = content.split(' ');

    switch (cmd) {
        case '/BAN':
            return await banUser(args[0], roomid);
        default:
            return '未注册指令';
    }

}

async function banUser(name, roomid) {

    const info = await wechat.getInfoByName(name, roomid);

    if (info) {
        const expr = info.wxid.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
        config.ResponsiveList.push(new RegExp('^' + expr + '$'));
        return '已禁止该用户使用智能回复';
    }

    return '查询用户信息失败';

}
