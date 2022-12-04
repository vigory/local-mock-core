English | [简体中文](./README_CN.md)

# GateWay proxy example

## Description of the directory structure

- `gateWay` is the nodejs gateWay write with `express` or `koa`. (pretend a simple gateway)
- `static-a` is the business domain environment. (pretend static resources that have been deployed on the server.)
- `static-b` is the local development environment. (pretend local static resources while debugging)

> gateWay as an entry, it handles interface and static resource forwarding. (Forward resources in `static-a`)

<img width="600" src="https://github.com/vigory/local-mock-core/docs/assets/h5-gateway.png" alt="h5-gateway" />

## Install & start

1. cd in `gateWay、static`、`static-a`、`static-b` install and run separately
1. Access gateWay `localhost:3000`, for user's access request, the static resource is forwarded directly `localhost:3000` -> `localhost:9000`
1. At this time, you can open a `static-a` page.
1. Click `open` button in localmock plugin，the local `devServer/localhost:9001` can directly accessible in domain `localhost:9000`

1. Click `open` button in localmock plugin, in `localhost:3000` you can access local `devServer`/`localhost:9001` page.

> Since then, the gateway debug mode has completed.
