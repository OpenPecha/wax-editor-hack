const { isAuthenticated } = require('@coko/server/authorization')

const permissions = {
  Query: {
    user: isAuthenticated,
    currentUser: isAuthenticated,
    users: isAuthenticated,
  },
  Mutation: {
    deleteUser: isAuthenticated,
    updateUser: isAuthenticated,
    createDoc: isAuthenticated,
    renameDoc: isAuthenticated,
    deleteDoc: isAuthenticated,
    updateCokoDocsUser: isAuthenticated,
    updatePassword: isAuthenticated,
  },
}

module.exports = permissions
