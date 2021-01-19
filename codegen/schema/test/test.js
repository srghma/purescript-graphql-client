require('env2')('./.env')
const { promisify } = require('util')
const mkdirp = require('mkdirp')
const rm = promisify(require('rimraf'))

const { generateSchemas } = require('../index.js')

const dir = 'src/test-output'

const go = async () => {
  try {
    await rm(dir)
    await mkdirp(dir)
    await mkdirp(dir + '/Schemas')
    await mkdirp(dir + '/Enum')
    await generateSchemas({
      dir,
      outsideTypes: require('./outside-types'),
      fieldTypeOverrides: {},
      isHasura: true
    }, require('./gql-endpoints'))
    console.log('test done')
  } catch (err) {
    console.error(err)
  }
}
go()