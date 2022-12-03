const spawn = require('cross-spawn')
const colors = require('colors/safe')

const versionEnv = process.env.VEISON_ENV || 'beta'

const cmdsMap = {
  patch: ['npm run build', 'npm run patch', 'npm run release'],
  beta: ['npm run build', 'npm run patch:beta', 'npm run release:beta'],
  minor: ['npm run build', 'npm run minor', 'npm run release'],
  major: ['npm run build', 'npm run major', 'npm run release'],
}

const cmdList = cmdsMap[versionEnv]

function start(cmdList) {
  const cmds = cmdList || []

  cmds.forEach((item, index) => {
    const argvs = typeof item === 'function' ? item() : item.split(' ')
    const [cli, ...options] = argvs
    // console.log(cli, [...options])
    console.log(colors.green(`step${index + 1}: ${argvs.join(' ')}`))
    // Spawn NPM synchronously
    spawn.sync(cli, [...options], { stdio: 'inherit' })
  })
}

start(cmdList)
