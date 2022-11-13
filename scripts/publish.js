const spawn = require('cross-spawn')
const colors = require('colors/safe')
const path = require('path')
const fs = require('fs')

const rootDir = path.resolve(__dirname, '../')

const packages = fs.readdirSync(path.join(rootDir, './packages'))

packages.forEach((target) => {
  start(target)
})

function start(target) {
  const targetDir = path.join(rootDir, './packages', target)

  const cdCmd = `cd ${targetDir}`

  const patchCmd = 'npm run patch'

  const buildCmd = 'npm run build'

  const changelogCmd = 'npm run createlog'

  const gitAddCmd = 'git add .'

  const gitCommitCmd = () => {
    const packageJson = require('../package.json')
    return ['git', 'commit', '-m', `build: version ${packageJson.version}`]
  }

  const gitTagCmd = () => {
    const packageJson = require('../package.json')
    return ['git', 'tag', '-a', `v${packageJson.version}`, '-m', 'build: auto tag']
  }

  const gitPushCmd = () => {
    const packageJson = require('../package.json')
    return ['git', 'push', 'origin', `v${packageJson.version}`]
  }

  const gitPushOrigin = 'git push'

  const publishCmd = 'npm publish --access=public'

  const cmds = [
    cdCmd,
    patchCmd,
    buildCmd,
    changelogCmd,
    gitAddCmd,
    gitCommitCmd,
    gitTagCmd,
    gitPushCmd,
    gitPushOrigin,
    publishCmd,
  ]

  cmds.forEach((item, index) => {
    const argvs = typeof item === 'function' ? item() : item.split(' ')
    const [cli, ...options] = argvs
    // console.log(cli, [...options])
    console.log(colors.green(`step${index + 1}: ${argvs.join(' ')}`))
    // Spawn NPM synchronously
    spawn.sync(cli, [...options], { stdio: 'inherit' })
  })
}
