import path from 'path';
import axios from 'axios';

import { logger } from './helper.js';
import * as config from './config.js';

/**
 * 变量表
 */
let wrest = axios;
let msgtypes = {};
let userinfo = {};
const friends = {};
const chatrooms = {};
const chatroomMembers = {};

/**
 * 预加载
 */
export async function preload() {

    let resp;

    logger(1, '初始化')
    wrest = axios.create({
        baseURL: config.WechaRestURL + '/api',
        responseType: 'json'
    });

    logger(1, '获取消息类型')
    resp = await wrest.get('/msg_types');
    if (resp.data.Payload) {
        msgtypes = resp.data.Payload;
    }

    logger(1, '获取个人信息')
    resp = await wrest.get('/user_info');
    if (resp.data.Payload) {
        userinfo = resp.data.Payload;
    }

    logger(1, '获取好友列表')
    resp = await wrest.get('/friends');
    if (resp.data.Payload) {
        resp.data.Payload.forEach(item => {
            friends[item.wxid] = item;
        });
    }

    logger(1, '获取群列表')
    resp = await wrest.get('/chatrooms');
    if (resp.data.Payload) {
        resp.data.Payload.forEach(item => {
            chatrooms[item.wxid] = item;
        });
    }

    logger(1, '注册消息回调')
    await wrest.post('/enable_forward_msg', {
        'url': `http://127.0.0.1:${config.WeboxPort}/reciver`
    }).catch(() => { })

}

/**
 * 获取消息类型
 * @param {number} id 类型Id
 * @returns {string} 类型
 */
export async function getMsgType(id) {

    return msgtypes[id] || '-';

}

/**
 * 获取群名称
 * @param {string} wxid 微信Id
 * @returns {string} 群名称
 */
export async function getRoomName(wxid) {

    const room = chatrooms[wxid];
    return room && room.name || '-';

}

/**
 * 获取用户名
 * @param {string} wxid 微信Id
 * @returns {string} 用户名
 */
export async function getUserName(wxid) {

    if (userinfo.wxid == wxid) {
        return userinfo.name;
    }

    if (friends[wxid] && friends[wxid].name) {
        friends[wxid].name;
    }

    let resp = await wrest.get('/user_info/' + wxid);
    if (resp.data.Payload && resp.data.Payload.name) {
        friends[wxid] = resp.data.Payload;
        return friends[wxid].name;
    }

    return '-';

}

/**
 * 根据昵称获取微信信息
 * @param {string} name 用户名
 * @returns {object} 微信信息
 */
export async function getInfoByName(name, roomid) {

    for (const info in friends) {
        if (info.name == name) {
            return info;
        }
    }

    if (roomid) {
        const roomMembers = await getRoomMembers(roomid);
        for (const info of roomMembers) {
            if (info.name == name) {
                return info;
            }
        }
    }

}

/**
 * 获取群成员列表
 * @param {string} roomid 群Id
 * @returns {array} 成员列表
 */
export async function getRoomMembers(roomid) {

    if (chatroomMembers[roomid]) {
        return chatroomMembers[roomid];
    }

    const resp = await wrest.get('/chatroom_members/' + roomid);
    if (resp.data.Payload) {
        chatroomMembers[roomid] = resp.data.Payload;
    }

    return chatroomMembers[roomid];

}

/**
 * 接受好友请求
 * @param {string} scene 场景
 * @param {string} v3 encryptusername
 * @param {string} v4 ticket
 * @returns 
 */
export async function accpetFriend(scene, v3, v4) {

    const resp = await wrest.post('/accept_new_friend', { scene: +scene, v3, v4 });
    return resp.data.Payload;

}

/**
 * 发送文本
 * @param {string} receiver 接收Id
 * @param {string} msg 消息内容
 * @param {string} aters @成员
 */
export async function sendTxt(receiver, msg, aters) {

    const resp = await wrest.post('/send_txt', { aters, msg, receiver });
    return resp.data.Payload;

}

/**
 * 发送拍一拍
 * @param {string} roomid 群Id
 * @param {string} wxid 成员Id
 */
export async function sendPatMsg(roomid, wxid) {

    const resp = await wrest.post('/send_pat_msg', { roomid, wxid });
    return resp.data.Payload;

}

/**
 * 下载图片
 * @param {string} msgid 消息Id
 * @param {string} extra 图片路径
 */
export async function saveImage(msgid, extra) {

    const dir = path.dirname(extra);
    const resp = await wrest.post('/download_image', { dir, msgid, extra });
    return resp.data.Payload;

}

/**
 * 邀请群成员
 */
export async function inviteChatroomMembers(roomid, wxids) {

    const resp = await wrest.post('/invite_chatroom_members', { roomid, wxids });
    return resp.data.Payload;

}
