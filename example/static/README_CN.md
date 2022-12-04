[English](./README.md) | 简体中文

# static 模式

## 目录结构说明

- `static-a` 表示业务域名环境（模拟已部署在服务器的静态资源）
- `static-b` 表示本地开发环境（模拟在在本地开发调试的静态资源）

<img width="600" src="https://github.com/vigory/local-mock-core/docs/assets/static-example.png" alt="static-example" />

## 安装与启动

1. 进入 static-a、static-b 分别安装并运行
1. 用户访问 `localhost:9000` 中看到了 static-a 的页面资源
1. 点击 localmock 面板中 `开启本地调试` 按钮，在`localhost:9000`域名下即可直接访问到本地的 `devServer`/`localhost:9001`

> 自此，静态调试模式已经完成
