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

    if (typeof data.content == 'string') {
        console.log('>> content =', data.content);
    } else {
        console.log('>> content =', JSON.stringify(data.content));
    }

    if (data.xml) {
        console.log('>> xml =', JSON.stringify(data.xml));
    }

});
