module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // rollupjs 会处理模块，所以设置成 false
        modules: false,
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [],
}
