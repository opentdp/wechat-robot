import * as config from '../library/config.js';
import * as gemini from './model/gemini.js';
import * as gpt35 from './model/gpt35.js';
import { cmd, models } from './cmd.js';

export default async function (sender, content, roomid) {

    // 权限检查

    switch (config.ResponsiveMode) {
        case 0:
            for (let expr in config.ResponsiveList) {
                if (expr.test(sender)) {
                    return '智能回复暂不可用';
                }
            }
            break;
        case 1:
            for (let expr in config.ResponsiveList) {
                if (!expr.test(sender)) {
                    return '智能回复暂不可用';
                }
            }
            break;
    }

    // 调用前置指令

    const uuid = sender + (roomid ? '#' + roomid : '');
    const type = models[uuid] || (models[uuid] = 'gemini');

    const resp = await cmd(uuid, content);
    if (resp.reply) {
        return resp.text;
    }

    // 调用模型回复

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
