[English](./README.md) | 简体中文

<a href="https://www.npmjs.com/package/local-mock-h5"><img src="https://img.shields.io/npm/v/local-mock-h5.svg?sanitize=true" alt="Version"></a>

# local-mock-h5

local-mock-h5 是一个 H5 端的调试插件，目前支持 [eruda](https://www.npmjs.com/package/eruda) 和 [vConsole](https://www.npmjs.com/package/vconsole)。

## 特性

- 🎉**无代理**，不需要将业务域名代理到本地（如：Charles Map Remote）
- 🚀**仅 devServer**，不需要同时启动 node 层服务
- 🌻**一键开启，调试方便**，通过 local-mock-h5 插件，一键即可在真机上开启调试

## 快速上手

### 安装

##### 通过 npm 或 yarn 安装

```shell
npm i local-mock-h5
yarn add local-mock-h5
```

##### 通过 CDN 使用 local-mock-h5

```html
<script src="https://cdn.jsdelivr.net/npm/local-mock-h5/dist/lib/index.js"></script>
<script>
  const { erudaLocalMock, vconsoleLocalMock } = window.localMockH5
</script>
```

### 添加插件

#### 安装 eruda 插件

```js
// #!if ENV === "development"
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-h5'

eruda.init()

const localMockplugin = erudaLocalMock(eruda, {
  state: 0,
  entry: 'http://localhost:8080',
})

eruda.add(localMockplugin)
// #!endif
```

#### 安装 vConsole 插件

```js
// #!if ENV === "development"
import VConsole from 'vconsole'
import { vconsoleLocalMock } from 'local-mock-h5'

const vconsole = new VConsole()

const localMockplugin = vconsoleLocalMock(VConsole, {
  state: 0,
  entry: 'http://localhost:8080',
})

vconsole.addPlugin(localMockplugin)
// #!endif
```

### 配置 `devServer`

由于是在业务域名中加载 `devServer` 的入口文件，所以需要配置跨域，同时配置 publicPath 用于加载本地静态资源

```json
{
  "devServer": {
    "publicPath": "http://localhost:8080",
    "port": 8080,
    "headers": {
      "Access-Control-Allow-Origin": "*"
    }
  }
}
```

### 真机调试

- 手机网络需要与本地主机处于同一局域网下
- `publicPath` 和 `proxy` 改为 `http://{ip}:{port}`，如：`http://192.168.1.10:8080`

#### 为什么要将 devServer 改成 IP 地址的形式？

因为真机上无法访问 lcoalhost:8080 的页面资源
