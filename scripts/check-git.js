const chalk = require('chalk')
const simpleGit = require('simple-git')

const cwd = process.cwd()
const git = simpleGit(cwd)

function exitProcess(code = 1) {
  console.log('') // Keep an empty line here to make looks good~
  process.exit(code)
}

async function checkCommit() {
  const { files } = await git.status()

  if (files && files.length) {
    console.log(chalk.red('๐ You forgot something to commit.'))
    console.log(chalk.yellow('๐ ๅๆไบคๆฌๅฐไปฃ็ ๅ'))
    files.forEach(({ path: filePath, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), filePath)
    })
    exitProcess()
  }
}

async function checkBranch() {
  const { current } = await git.branch()

  if (!current.includes('release')) {
    console.log(chalk.red('๐ You forgot to change branch to release.'))
    console.log(chalk.yellow('๐ ่ฎฐๅพๅๆขๅฐ release ๅๆฏ'))
    exitProcess()
  }
}

async function checkAll() {
  await checkCommit()
  await checkBranch()
}

checkAll()
