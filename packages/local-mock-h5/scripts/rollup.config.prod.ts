// yarn add -D rollup-plugin-serve rollup-plugin-livereload
import filesize from 'rollup-plugin-filesize'
import baseConfig from '../rollup.config'

export default {
  ...baseConfig,
  plugins: [...(baseConfig.plugins as Array<any>), filesize()],
}
