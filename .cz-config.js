const { commitizen } = require('@coko/lint')

commitizen.scopes = ['server', 'models', '*']

module.exports = commitizen
