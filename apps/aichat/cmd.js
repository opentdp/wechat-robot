import { inviteChatroomMembers } from '../library/wechat.js';

export const history = {};

export async function cmd(id, msg) {

    let resp;
    let text = '';

    history[id] || (history[id] = []);

    if (/^\/[a-z-0-9]{2,9}$/.test(msg)) {
        switch (msg) {
            case '/new':
                history[id] = [];
                text = '已清空上下文';
                break;
            case '/help':
                const list = [];
                list.push('/ai 向我提问或发起聊天');
                list.push(`/new 重置上下文，当前占用 ${history[id].length}`);
                if (id.indexOf('@chatroom') === -1) {
                    list.push('/room-1 加入 OpenTDP 开发群');
                    list.push('/room-2 加入 OpenTDP 闲聊群');
                }
                list.push('/help 显示此帮助信息');
                text = list.join('\n');
                break;
            case '/room-1':
                if (id.indexOf('@chatroom') === -1) {
                    resp = await inviteChatroomMembers('38699745819@chatroom', id);
                    text = '已发送 OpenTDP 开发群的邀请，稍后请点击进入';
                } else {
                    text = '群聊无法使用该指令';
                }
                break;
            case '/room-2':
                if (id.indexOf('@chatroom') === -1) {
                    resp = await inviteChatroomMembers('17907657671@chatroom', id);
                    text = '已发送 OpenTDP 闲聊群的邀请，稍后请点击进入';
                } else {
                    text = '群聊无法使用该指令';
                }
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
