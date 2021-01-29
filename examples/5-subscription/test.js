const { deepStrictEqual } = require('assert')
const exec = require('exec-sh').promise
const logs = []

console.log = (log) => {
  console.info(log)
  logs.push(log)
}

require('./server-fn')(async () => {
  try {
    console.info('start')
    // await require('./generate-purs-schema')()
    console.info('building purs')
    await exec('npm run build', { stdio: 'pipe', stderr: 'pipe' })
    console.info('running main')
    require('./output/Main').main()
    setTimeout(() => {
      deepStrictEqual(logs, ['[RED]', '1', '[GREEN]'])
      console.info('tests passed')
      process.exit(0)
    }, 250)
  } catch (err) {
    console.error('test error', err)
    process.exit(1)
  }
})

setTimeout(() => {
  console.error('Timeout')
  process.exit(1)
}, 60000)