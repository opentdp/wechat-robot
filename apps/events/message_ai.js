import aichat from '../aichat/entry.js';
import manage from '../aichat/manage.js';
import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';

emitter.on('message', async data => {

    switch (data.type) {
        case 1:
            // 忽略公号消息
            if (/^gh_/.test(data.sender)) {
                return;
            }
            // 清理消息内容
            data.content = data.content.trim();
            // 处理特权指令
            if (/^\/[A-Z]{2,30}\s.+$/.test(data.content)) {
                if (data.is_group) {
                    const name = await wechat.getUserName(data.sender);
                    const resp = await manage(data.sender, data.content, data.roomid);
                    wechat.sendTxt(data.roomid, '@' + name + '\n' + resp, data.sender);
                } else {
                    const resp = await manage(data.sender, data.content);
                    wechat.sendTxt(data.sender, resp);
                }
                return;
            }
            // 处理通用指令
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
