const spawn = require('cross-spawn')
const colors = require('colors/safe')

function start() {
  const buildCmd = 'npm run build'

  const versionCmd = 'npm run patch:beta'

  const publishCmd = 'npm run release:beta'

  const cmds = [buildCmd, versionCmd, publishCmd]

  cmds.forEach((item, index) => {
    const argvs = typeof item === 'function' ? item() : item.split(' ')
    const [cli, ...options] = argvs
    // console.log(cli, [...options])
    console.log(colors.green(`step${index + 1}: ${argvs.join(' ')}`))
    // Spawn NPM synchronously
    spawn.sync(cli, [...options], { stdio: 'inherit' })
  })
}

start()
