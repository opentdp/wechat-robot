import { config } from 'dotenv';

config({ override: true });

// Webox 参数配置

export const WeboxMode = (process.env.WEBOX_MODE || 'production');
export const WeboxRoot = (process.env.WEBOX_ROOT || 'apps/webroot');
export const WeboxHost = (process.env.WEBOX_HOST || '127.0.0.1');
export const WeboxPort = (process.env.WEBOX_PORT || '7660');

// Wechat Rest URL

export const WechaRestURL = (process.env.WECHAT_REST_URL || 'http://127.0.0.1:7600');

// Google AI 密钥

export const GoogleAiUrl = (process.env.GOOGLE_AI_URL || 'https://generativelanguage.googleapis.com');
export const GoogleAiKey = (process.env.GOOGLE_AI_KEY || '');

// Openai 密钥

export const OpenaiUrl = (process.env.OPENAI_URL || 'https://api.openai.com');
export const OpenaiKey = (process.env.OPENAI_KEY || '');

// 管理员列表

export const AdminList = (process.env.ADMIN_LIST || '').split(',');

// 响应模式 [0:黑名单, 1:白名单]

export const ResponsiveMode = parseInt(process.env.RESPONSIVE_MODE || '0');

// 响应名单列表，支持*模糊匹配

export const ResponsiveList = (process.env.RESPONSIVE_LIST || '').split(',');

ResponsiveList.forEach((item, index) => {
    item = item.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    item = '^' + item.replace('*', '.*') + '$';
    ResponsiveList[index] = new RegExp(item);
});

// 群聊邀请

// const roomVariables = Object.keys(process.env)
//   .filter(key => key.startsWith('INVITE_ROOM'))
//   .reduce((obj, key) => {
//     console.log(key)
//     obj[key] = process.env[key];
//     return obj;
//   }, {});

// console.log(Object.keys(process.env));
