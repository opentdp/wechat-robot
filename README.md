# 微信机器人

基于 [PC Wechat Rest Api](https://github.com/opentdp/wechat-rest) 实现的微信机器人，已实现如下功能：

- 自动添加好友
- 自动拉好友进群
- 自动回应拍一拍
- 支持切换对话模型
- 接入谷歌 Gemini 模型
- 接入OpenAI gpt-3.5 模型

## 使用方法

**1、** 下载并安装 [WeChat-v3.9.2.23](https://github.com/opentdp/wechat-rest/releases/download/v0.0.1/WeChatSetup-3.9.2.23.exe)，必须此版本

**2、** 下载并安装 [Node-v16.20.2](https://nodejs.org/dist/v16.20.2/node-v16.20.2-x64.msi)，大于此版本即可

**3、** 下载本仓库源码，参考 `example.env` 创建 `.env` 文件

**4、** 双击 `wrest.bat` 启动微信接口服务

**5、** 双击 `serve.bat` 启动机器人

> 如果双击后闪退，请修改bat文件的换行为windows格式

## 配置说明

```shell
# 监听端口
WEBOX_MODE=production
WEBOX_ROOT=apps/webroot
WEBOX_HOST=127.0.0.1
WEBOX_PORT=7660

# Wechat Rest Api
WECHAT_REST_API=http://127.0.0.1:7600

# Google AI 密钥
GOOGLE_AI_KEY=YOUR-GOOGLE-AI-API-KEY
```
