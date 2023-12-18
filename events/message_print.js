import { emitter } from '../library/helper.js';
import * as wechat from '../library/wechat.js';

emitter.on('message', async data => {

    let from = await wechat.getUserName(data.sender);
    if (data.roomid) {
        from = '[' + await wechat.getRoomName(data.roomid) + '] ' + from;
    }

    const type = await wechat.getMsgType(data.type);
    console.log(`\n[${from}]`, `type=${type}`, `id=${data.id}`);

    switch (data.type) {
        case 1:
            console.log(data.content);
            break;
        case 3:
            console.log(data.extra);
            break;
        case 49:
            const match = /<title>(.*?)<\/title>/.exec(data.content);
            console.log(match ? match[1] : '{无法识别}');
            break;
        default:
            console.log(data.content);
    }

});
