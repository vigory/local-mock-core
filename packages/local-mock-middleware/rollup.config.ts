import { defineConfig } from 'rollup'
// yarn add -D @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-alias @rollup/plugin-replace @rollup/plugin-eslint @rollup/plugin-typescript @rollup/plugin-babel rollup-plugin-terser rollup-plugin-clear @rollup/plugin-json
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs' // cjs => esm
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

const { name, version, author } = packageJson

// 打包处理的文件，添加的备注信息
const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default defineConfig({
  input: 'src/index.ts',
  // 同时打包多种规范的产物
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: name,
      banner,
      plugins: [terser()],
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      name: name,
      banner,
    },
  ],
  // 注意 plugin 的使用顺序
  plugins: [
    json(),
    clear({
      targets: ['dist'],
    }),
    typescript(),
    alias({
      entries: [
        {
          find: '@/*',
          replacement: 'src/*',
          // OR place `customResolver` here. See explanation below.
        },
      ],
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true,
    }),
    commonjs({
      include: ['node_modules/**', '../../node_modules/**'],
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ['src/**'],
      exclude: ['node_modules/**', '../../node_modules/**'],
    }),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
  ],
})
