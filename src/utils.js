const jwt = require('jsonwebtoken')

const APP_SECRET = 'GraphQL-is-awesome'

module.exports = {
  APP_SECRET,
  getUserId(context) {
    const Auth = context
      .request
      .get('Authorization')

    if (Auth) {
      const token = Auth.replace('Bearer', '')
      const { userId } = jwt
        .verify(token, APP_SECRET)

      return userId
    }
    throw new Error('Not authenticated')
  }
}
