/*!
 * Wechat Rest Client
 * @author wang@rehiy.com
 */

console.log('=================================================');
console.log('=           Wechat Rest Client v0.1.0.0         =');
console.log('=                  Update: Dec. 16 2023         =');
console.log('=================================================');

import { config } from 'dotenv';

import { serve } from './library/server.js';
import * as wechat from './library/wechat.js';

import './modules/message_ai.js';
import './modules/message_print.js';

config({ override: true });
wechat.preload().then(() => {
    serve();
});

