const spawn = require('cross-spawn')
const colors = require('colors/safe')

function start() {
  const buildCmd = 'npm run build'

  const versionCmd = 'npm run version'

  const publishCmd = 'npm run publish'

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
