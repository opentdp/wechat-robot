import { config } from 'dotenv';

import { serve } from '../library/server.js';
import { preload } from '../library/wechat.js';

import '../modules/message_ai.js';
import '../modules/message_print.js';

export default async () => {
    config({ override: true });
    await preload();
    serve();
};
