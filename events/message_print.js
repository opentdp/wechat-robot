import { parseStringPromise } from 'xml2js';
import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';

emitter.on('message', async data => {

    let from = await wechat.getUserName(data.sender);
    if (data.roomid) {
        const room = await wechat.getRoomName(data.roomid)
        from = `[${room}] ${from}`;
    }

    const type = await wechat.getMsgType(data.type);
    console.log(`\n[${from}]`, `type=${type}`, `id=${data.id}`);

    switch (data.type) {
        case 1:
            console.log(data.content);
            break;
        case 3:
            console.log(data.extra);
        case 37:
            const content = await parseStringPromise(data.content);
            if (content && content.msg && content.msg.$) {
                const smsg = content.msg.$.content
                const suser = content.msg.$.sourcenickname
                console.log('收到好友请求', smsg ? `备注：${smsg}` : '', suser ? `来自 ${suser} 分享的名片` : '');
            }
            break;
        case 49:
            const match = /<title>(.*?)<\/title>/.exec(data.content);
            console.log(match ? match[1] : '{无法识别}');
            break;
        default:
            console.log(data.content);
    }

});
