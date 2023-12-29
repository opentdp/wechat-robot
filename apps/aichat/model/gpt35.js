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
        if (e.response.data) {
            if (e.response.data.error) {
                history[id] = [];
                return [
                    '发生了一个无法恢复的错误，已为你清空上下文，请稍后重试。',
                    '错误信息：' + e.response.data.error.message
                ].join('\n');
            }
            return e.response.data || '发生了一个未知的接口错误，请稍后重试';
        }
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
            const mesg = resp.data.choices[0].message;
            history[id].push(mesg);
            return mesg.content;
        }
        return '出于某些原因，此问题无法回答';
    } catch (err) {
        return perror(id, err);
    }

    return '太累了，我休息会儿。。。';

}
