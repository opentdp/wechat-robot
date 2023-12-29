import { inviteChatroomMembers } from '../wechat.js';

export const history = {};

export async function cmd(id, msg) {

    let resp;
    let text = '';

    history[id] || (history[id] = []);

    if (/^\/[a-z-0-9]{3,7}$/.test(msg)) {
        switch (msg) {
            case '/new':
                history[id] = [];
                text = '已清空上下文';
                break;
            case '/help':
                text = [
                    '/ai 向机器人发送消息',
                    '/new 重置聊天上下文内容',
                    '/room-1 加入 OpenTDP 开发群',
                    '/room-2 加入 OpenTDP 闲聊群',
                    `请注意：当前已使用上下文长度 ${history[id].length}`
                ].join('\n');
                break;
            case '/room-1':
                resp = await inviteChatroomMembers('38699745819@chatroom', id);
                text = '已发送 OpenTDP 开发群的邀请，稍后请点击进入';
                break;
            case '/room-2':
                resp = await inviteChatroomMembers('17907657671@chatroom', id);
                text = '已发送 OpenTDP 闲聊群的邀请，稍后请点击进入';
                break;
            default:
                text = '未注册指令';
                break;
        }
        return { text, reply: true }
    }

    text = msg.replace(/^\/ai\s/, '').trim();
    return { text, reply: false }

}
