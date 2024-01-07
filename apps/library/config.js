import { config } from 'dotenv';

config({ override: true });

// Webox 参数配置
export const WeboxMode = (process.env.WEBOX_MODE || '');
export const WeboxRoot = (process.env.WEBOX_ROOT || '');
export const WeboxHost = (process.env.WEBOX_HOST || '');
export const WeboxPort = (process.env.WEBOX_PORT || '');

// Wechat Rest Api
export const WechaRestApi = (process.env.WECHAT_REST_API || '');

// Google AI 密钥
export const GoogleAiKey = (process.env.GOOGLE_AI_KEY || '');

// Openai 密钥
export const OpenaiKey = (process.env.OPENAI_KEY || '');

// 响应模式 [0:黑名单, 1:白名单]
export const ResponsiveMode = 0;

// 响应模式名单数据
export const ResponsiveList = (process.env.WHITE_LIST || '').split(',');

// 群聊邀请

// const roomVariables = Object.keys(process.env)
//   .filter(key => key.startsWith('INVITE_ROOM'))
//   .reduce((obj, key) => {
//     console.log(key)
//     obj[key] = process.env[key];
//     return obj;
//   }, {});

// console.log(Object.keys(process.env));
