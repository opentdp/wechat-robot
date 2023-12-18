import { config } from 'dotenv';

import { serve } from '../library/server.js';
import * as wechat from '../library/wechat.js';

import '../modules/message_ai.js';
import '../modules/message_print.js';

config({ override: true });
wechat.preload().then(() => {
    serve();
});
