import * as gemini from './model/gemini.js';
import * as gpt35 from './model/gpt35.js';
import { cmd, models } from './cmd.js';

export default async function (sender, content, roomid) {

    const uuid = sender + (roomid ? '#' + roomid : '');
    const type = models[uuid] || (models[uuid] = 'gemini');

    const { text, reply } = await cmd(uuid, content);
    if (reply) {
        return text;
    }

    switch (type) {
        case 'gemini':
            gemini.preload();
            return await gemini.chat(uuid, text);
        case 'gpt35':
            gpt35.preload();
            return await gpt35.chat(uuid, text);
    }

    return '模型暂不可用';

}
