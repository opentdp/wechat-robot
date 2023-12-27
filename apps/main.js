import { config } from 'dotenv';

import { serve } from './library/server.js';
import { preload } from './library/wechat.js';

import './events/message_ai.js';
import './events/message_print.js';
import './events/message_system.js';

export default async () => {

    config({ override: true });

    await preload();
    serve();

};
