const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, APP_SECRET } = require('../utils')

module.exports = {
  post(root, args, context, info) {
    const userId = getUserId(context)
    const m = {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: {id: userId } },
      },
    }

    return context
      .db
      .mutation
      .createLink(m, info)
  },

  async signup(root, args, context, info) {
    const password = await bcrypt
      .hash(args.password, 10)


    const m = { data: { ...args, password } }
    const user = await context
      .db
      .mutation
      .createUser(m, `{ id }`)

    const Token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { Token, user }
  },

  async login(root, args, context, info) {
    const q = { where: { email: args.email } }
    const user = await context
      .db
      .query
      .user(q, `{ id password }`)

    if (!user) {
      throw new Error('No such user found')
    }

    const something = bcrypt
      .compare(args.password, user.password)

    const valid = await something

    if (!valid) {
      throw new Error('Invalid Password!')
    }

    const Token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { Token, user }
  },

}


