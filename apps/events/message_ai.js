import aichat from '../aichat/entry.js';
import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';

emitter.on('message', async data => {

    switch (data.type) {
        case 1:
            // 忽略公号消息
            if (/^gh_/.test(data.sender)) {
                return;
            }
            // 处理指令消息
            if (/^\/(ai\s|[a-z:0-9]{2,30}$)/.test(data.content)) {
                if (data.is_group) {
                    const name = await wechat.getUserName(data.sender);
                    const resp = await aichat(data.sender, data.content, data.roomid);
                    wechat.sendTxt(data.roomid, '@' + name + '\n' + resp, data.sender);
                } else {
                    const resp = await aichat(data.sender, data.content);
                    wechat.sendTxt(data.sender, resp);
                }
                return;
            }
            break;
        case 3:
            break;
    }

});
