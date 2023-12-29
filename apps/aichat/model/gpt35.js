import axios from 'axios';

import { history } from '../cmd.js';

/**
 * 变量表
 */
let openai = axios;

/**
 * 预加载
 */
export function preload() {

    if (preload.done) {
        preload.done = true;
        return;
    }

    openai = axios.create({
        baseURL: 'https://chat.451024.xyz/v1',
        headers: {
            'Authorization': process.env.OPENAI_KEY,
            'Content-Type': 'application/json',
        },
        responseType: 'json',
    });

}

/**
 * 错误处理
 * @param {string} id 对象Id
 * @param {error} e 错误
 */
export function perror(id, e) {

    history[id].pop();

    if (e.response) {
        return e.response.statusText || '发生了一个未知的网络错误，请稍后重试';
    }

    return e.message || '发生了一个未知的错误，请稍后重试';

}

/**
 * AI 文本聊天
 * @param {string} id 对象Id
 * @param {string} msg 消息内容
 */
export async function chat(id, msg) {

    history[id].push({ role: 'user', content: msg });

    try {
        const body = { model: 'gpt-3.5-turbo', messages: history[id] };
        const resp = await openai.post('/chat/completions', body);
        if (resp && resp.data && resp.data.choices) {
            if (resp.data.choices[0]) {
                const mesg = resp.data.choices[0].message;
                history[id].push(mesg);
                return mesg.content;
            }
            return '出于某些原因，此问题无法回答';
        }
        return '太累了，我休息会儿。。。';
    } catch (err) {
        return perror(id, err);
    }

}
