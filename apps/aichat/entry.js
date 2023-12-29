import * as gemini from './model/gemini.js';
import * as openai from './model/openai.js';

const models = {}
const ready = {}

export default async function (sender, content, roomid) {

    const type = models[sender] || (models[sender] = 'gemini');
    const uuid = sender + (roomid || '');

    switch (type) {
        case 'gemini':
            if (!ready.gemini) {
                ready.gemini = true;
                gemini.preload();
            }
            return await gemini.chat(uuid, content);
        case 'openai':
            if (!ready.openai) {
                ready.openai = true;
                openai.preload();
            }
            return await openai.chat(uuid, content);
    }

    return '模型暂不可用';

}
