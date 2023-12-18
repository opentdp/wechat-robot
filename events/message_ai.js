import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';
import aichat from '../library/aichat/app.js';

emitter.on('message', async data => {

    const ai = aichat('gemini');

    switch (data.type) {
        case 1:
            if (!data.is_group) {
                const resp = await ai.chat(data.sender, data.content);
                wechat.sendTxt(data.sender, resp);
            } else if (/^\/(ai\s|[a-z]{3,7}$)/.test(data.content)) {
                const name = await wechat.getUserName(data.sender);
                const resp = await ai.chat(data.sender + data.roomid, data.content);
                wechat.sendTxt(data.roomid, '@' + name + '\n' + resp, data.sender);
            }
            break;
        case 3:
            break;
        case 10000: //系统消息
            if (/拍了拍我/.test(data.content)) {
                wechat.sendPatMsg(data.roomid, data.sender);
            }
            break;
    }

});
