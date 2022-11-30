import { __assign, __spreadArray } from 'tslib';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { defineConfig } from 'rollup';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
import { createRequire } from 'node:module';

var require = createRequire('file:///Users/qinwen/code/%E5%BC%80%E6%BA%90/local-mock-core/packages/local-mock-easy/rollup.config.ts');
var packageJson = require('./package.json');
var name = packageJson.name, version = packageJson.version, author = packageJson.author;
// 打包处理的文件，添加的备注信息
var banner = '/*!\n' +
    " * ".concat(name, " v").concat(version, "\n") +
    " * (c) 2022-".concat(new Date().getFullYear(), " ").concat(author, "\n") +
    ' * Released under the MIT License.\n' +
    ' */';
var baseConfig = defineConfig({
    input: 'src/index.ts',
    // 同时打包多种规范的产物
    output: [
        {
            file: 'dist/index.js',
            format: 'umd',
            name: name,
            banner: banner,
            plugins: [terser()],
        },
        {
            file: 'dist/index.esm.js',
            format: 'es',
            name: name,
            banner: banner,
            plugins: [terser()],
        },
        {
            file: 'dist/index.global.js',
            format: 'iife',
            name: name.replace(/-(\w)/g, function ($0, $1) { return $1.toUpperCase(); }),
            banner: banner,
            plugins: [terser()],
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
            include: 'node_modules/**',
        }),
        eslint({
            throwOnError: true,
            include: ['src/**'],
            exclude: ['node_modules/**'],
        }),
        babel({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            babelHelpers: 'bundled',
        }),
    ],
});

var rollup_config_dev = __assign(__assign({}, baseConfig), { plugins: __spreadArray(__spreadArray([], baseConfig.plugins, true), [
        serve({
            open: true,
            port: '3002',
            contentBase: '.',
            openPage: '/examples/index.html',
        }),
        livereload({
            watch: 'examples',
        }),
    ], false) });

export { rollup_config_dev as default };
