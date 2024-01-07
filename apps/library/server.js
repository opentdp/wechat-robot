import webox from 'webox-node';

import * as config from './config.js';
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
        WEBOX_MODE: config.WeboxMode,
        WEBOX_ROOT: config.WeboxRoot,
        WEBOX_HOST: config.WeboxHost,
        WEBOX_PORT: config.WeboxPort,
    });

}
