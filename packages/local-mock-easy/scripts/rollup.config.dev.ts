// yarn add -D rollup-plugin-serve rollup-plugin-livereload
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import baseConfig from '../rollup.config'

export default {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins as Array<any>),
    serve({
      open: true,
      port: '3002',
      contentBase: '.',
      openPage: '/examples/index.html',
    }),
    livereload({
      watch: 'examples',
    }),
  ],
}
