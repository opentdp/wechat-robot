import aichat from '../aichat/entry.js';
import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';

emitter.on('message', async data => {

    const ai = aichat('gemini');

    switch (data.type) {
        case 1:
            // 忽略公号消息
            if (/^gh_/.test(data.sender)) {
                return;
            }
            // 处理私聊消息
            if (!data.is_group) {
                const resp = await ai.chat(data.sender, data.content);
                wechat.sendTxt(data.sender, resp);
                return;
            }
            // 处理群内的指令
            if (/^\/(ai\s|[a-z]{3,7}$)/.test(data.content)) {
                const name = await wechat.getUserName(data.sender);
                const resp = await ai.chat(data.sender + data.roomid, data.content);
                wechat.sendTxt(data.roomid, '@' + name + '\n' + resp, data.sender);
                return;
            }
            break;
        case 3:
            break;
    }

});
