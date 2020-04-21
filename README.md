# Telegram-Channel-Mirror

> 🎙️ 利用 CloudFlare Worker 搭建 telegram 频道镜像站，使得国内可以访问

预览地址：[🍭idealclover 的日常](https://tg.idealclover.workers.dev/)

注：由于图片与视频消耗过大并难以反代，故不进行处理

## 所需配置项

主文件 [index.js](./index.js)，其中有如下需配置项

```
channel_name: 频道名称
host_name: 反代后的域名，供替换使用
icon_url: 由于不反代图片，故需另存头像链接
```

## 使用方式 1: 直接在 CF Worker 中编辑

1. 在 [CloudFlare Workers](https://workers.cloudflare.com/) 中注册账号、创建 Workers

2. 使用快速编辑，将 [index.js](./index.js) 中的代码复制至编辑区

3. 保存并部署，查看效果

## 使用方式 2：通过 wrangler

### 1. 配置环境

1. 安装 yarn 与 npm （推荐 yarn）

2. 下载或 clone 项目，并执行 `yarn` 或 `npm install` 进行安装

3. 命令行中安装 wrangler：`yarn global add @cloudflare/wrangler` 或 `npm i @cloudflare/wrangler -g`

### 2. 配置 API Token

1. 在 [Get API Token](https://dash.cloudflare.com/profile/api-tokens) 中新建 Token，注意赋予修改 Workers 权限

2. 命令行中 `wrangler config` 并输入 Token

3. 在 Workers 中查看 account ID，并复制至 [wrangler.toml](./wrangler.toml) 中

4. 命令行中 `yarn run publish` 进行上传

5. 在 Workers 中查看结果

## 开源许可

感谢 [木子](https://k8s.li/) 的 [灵感](https://blog.k8s.li/cloudflare-worker-build-mirror-website.html) 的灵感及 [Chr](https://ichr.me/) 的 [相关文章](https://blog.ichr.me/post/cloudflare-worker-build-mirror-website/)

Under MIT LICENSE.

Long live open-source.
