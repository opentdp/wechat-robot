import { parseStringPromise } from 'xml2js';
import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';

emitter.on('message', async data => {

    switch (data.type) {
        case 37:
            // 自动接受好友请求
            const content = await parseStringPromise(data.content);
            if (content && content.msg && content.msg.$) {
                wechat.accpetFriend(content.msg.$.scene, content.msg.$.encryptusername, content.msg.$.ticket)
            }
            break;
        case 10000:
            // 拍一拍
            if (/拍了拍我/.test(data.content)) {
                wechat.sendPatMsg(data.roomid, data.sender);
                return;
            }
            // 添加好友后自动回复
            if (/现在可以开始聊天了/.test(data.content)) {
                wechat.sendTxt(data.sender, '你好，我是小欧，可以和我聊天啦！');
            }
            break;
    }

});
