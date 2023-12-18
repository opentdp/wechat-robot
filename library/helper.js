import EventEmitter from 'events';
export const emitter = new EventEmitter();

import webox from 'webox-node';
export const { logger, dateFormat } = webox.helper;
