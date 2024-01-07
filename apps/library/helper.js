import EventEmitter from 'events';
export const emitter = new EventEmitter();

import webox from 'webox-node';
export const { dateFormat } = webox.helper;

export function logger(level, ...msg) {

    let time = '[' + dateFormat('yyyy-MM-dd hh:mm:ss') + ']';
    console.log(time, 'Wxbot -', ...msg);

}
