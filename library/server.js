import webox from 'webox-node';

import { emitter } from './helper.js';

/**
 * 初始化服务
 */
export function serve() {

    const { httpMessage } = webox.helper;

    // 接收消息
    webox.use({
        route: '/reciver',
        handle: (request, response) => {
            emitter.emit('message', request.bodyObject);
            httpMessage(response, true, 200);
            return true;
        }
    });

    // 开启监听
    webox.init({
        WEBOX_MODE: process.env.WEBOX_MODE,
        WEBOX_ROOT: process.env.WEBOX_ROOT,
        WEBOX_PORT: process.env.WEBOX_PORT,
    });

}
