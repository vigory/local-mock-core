English | [简体中文](./README_CN.md)

# Static mode

## Description of the directory structure

- `static-a` is the business domain environment. (pretend static resources that have been deployed on the server.)
- `static-b` is the local development environment. (pretend local static resources while debugging)

<img width="600" src="https://github.com/vigory/local-mock-core/docs/assets/static-example.png" alt="static-example" />

## Install & start

1. cd in `static-a`、`static-b` install and run separately
1. Access `localhost:9000` you can open a `static-a` page.
1. Click `open` button in localmock plugin，the local `devServer/localhost:9001` can directly accessible in domain `localhost:9000`

> Since then, static debugging mode has been completed.
