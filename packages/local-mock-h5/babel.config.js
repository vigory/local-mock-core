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
    [
      '@babel/preset-react',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [],
}
