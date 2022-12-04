[English](./README.md) | 简体中文

# gateWay 转发 example

## 目录结构说明

- gateWay 为 nodejs 网关层 中包含 express 和 koa 的服务器代码（用于模拟简单网关层）
- static-a 表示业务域名环境（模拟已部署在服务器的静态资源）
- static-b 表示本地开发环境（模拟在在本地开发调试的静态资源）

> gateWay 作为对外暴露的口子，会处理接口、静态资源转发（转发 static-a 中的资源）

<img width="600" src="https://github.com/vigory/local-mock-core/docs/assets/h5-gateway.png" alt="h5-gateway" />

## 安装与启动

1. 进入 gateWay、static-a、static-b 分别安装并运行
1. 用户访问 gateWay `localhost:3000` ，对于用户的访问请求，静态资源会直接转发 `localhost:3000` -> `localhost:9000`
1. 这时用户在 `localhost:3000` 中看到了 static-a 的页面资源
1. 点击 localmock 面板中 `开启本地调试` 按钮，在`localhost:3000`域名下即可直接访问到本地的 `devServer`/`localhost:9001`

> 自此，网关调试模式已经完成
