# 微信机器人

基于 [PC Wechat Rest Api](https://github.com/opentdp/wechat-rest) 实现的微信机器人，已实现如下功能：

- 自动回应拍一拍
- 对接谷歌 Gemini 模型实现智能聊天

## 使用方法

**1、** 下载 [WeChatSetup-3.9.2.23](https://github.com/opentdp/wechat-rest/releases/download/v0.0.1/WeChatSetup-3.9.2.23.exe) 和 [Wechat-rest](https://github.com/opentdp/wechat-rest/releases/download/v0.4.4/wechat-rest.zip)

**2、** 在一台 Windows 系统电脑上安装刚刚下载的微信

**3、** 同一台电脑上，解压 `Wechat-rest` ，双击 `wrest.exe` 启动接口服务

**4、** 浏览器打开 `http://localhost:7600` 确认接口服务已启动

**5、** 安装 Nodejs *v16+*，<https://nodejs.org/dist/v16.20.2/node-v16.20.2-x64.msi>

**6、** 克隆本仓库，参考 `example.env` 创建 `.env` 文件

**7、** 修改 `.env` 文件并运行 `serve.bat` 启动机器人

## 配置说明

```shell
# 监听端口
WEBOX_MODE=production
WEBOX_ROOT=src/webroot
WEBOX_PORT=7660

# Wechat Rest Api
WECHAT_REST_API=http://127.0.0.1:7600

# Google AI 密钥
GOOGLE_AI_KEY=YOUR-GOOGLE-AI-API-KEY
```
