import fs from 'fs';
import axios from 'axios';

/**
 * 变量表
 */
const history = {};
const gemini = axios.create({
    baseURL: 'https://gogai.179971.xyz/v1beta/models',
    responseType: 'json',
});

/** 
 * 错误处理
 * @param {error} e 错误
 */
function parseError(e) {

    if (e.response) {
        if (e.response.data) {
            if (e.response.data.error) {
                history[id] = [];
                return [
                    '发生了一个无法恢复的错误，已为你清空上下，请稍后重试。',
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
 * @param {string} id 记录Id
 * @param {string} msg 消息内容
 */
export async function chat(id, msg) {

    history[id] || (history[id] = []);
    history[id].length > 10 && history[id].splice(0, 2);

    if (/^\/[a-z]{3,7}$/.test(msg)) {
        switch (msg) {
            case '/new':
                history[id] = [];
                return '已清空上下文';
            case '/help':
                return [
                    '/ai 向机器人发送消息',
                    '/new 重置聊天上下文内容',
                    '请注意：当前上下文最大长度为10，超出限制将按序忽略'
                ].join('\n');
            default:
                return '未注册指令';
        }
    }

    msg = msg.replace(/^\/ai\s/, '').trim();
    history[id].push({ role: 'user', parts: [{ text: msg }] });

    try {
        const body = { 'contents': history[id] };
        const resp = await gemini.post(
            `/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`, body
        );
        if (resp.data.candidates && resp.data.candidates.length > 0) {
            if (!resp.data.candidates[0].content) {
                throw new Error('由于某些原因，此问题无法回答');
            }
            const txt = resp.data.candidates[0].content.parts[0].text;
            history[id].push({ role: 'model', parts: [{ text: txt }] });
            return txt;
        }
    } catch (e) {
        history[id].pop();
        return parseError(e);
    }

    return '太累了，我休息会儿。。。';

}

/**
 * AI 图片识别
 * @param {string} path 图片路径
 */
export async function image(path) {

    if (!path || !fs.existsSync(path)) {
        return '图片不存在';
    }

    try {
        const body = {
            'contents': {
                'parts': [
                    { 'text': '识别并描述这张图片' },
                    {
                        'inline_data': {
                            'mime_type': 'image/jpeg',
                            'data': fs.readFileSync(path).toString('base64')
                        }
                    }
                ]
            }
        };
        const resp = await gemini.post(
            `/gemini-pro-vision:generateContent?key=${process.env.GOOGLE_API_KEY}`, body
        );
        if (resp.data.candidates && resp.data.candidates.length > 0) {
            if (!resp.data.candidates[0].content) {
                throw new Error('出于某些原因，此问题无法回答');
            }
            return resp.data.candidates[0].content.parts[0].text;
        }
    } catch (e) {
        return parseError(e);
    }

    return '太累了，我休息会儿。。。';

}
