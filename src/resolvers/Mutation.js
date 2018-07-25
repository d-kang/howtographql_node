const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, APP_SECRET } = require('../utils')

module.exports = {
  post(root, args, context, info) {
    const userId = getUserId(context)
    const data = {
      url: args.url,
      description: args.description,
      postedBy: { connect: {id: userId } },
    }

    return context
      .db
      .mutation
      .createLink({ data }, info)
  },

  async signup(root, args, context, info) {
    const password = await bcrypt
      .hash(args.password, 10)


    const data = { data: { ...args, password } }
    const user = await context
      .db
      .mutation
      .createUser({ data }, `{ id }`)

    const Token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { Token, user }
  },

  async login(root, args, context, info) {
    const where = { email: args.email }
    const user = await context
      .db
      .query
      .user({ where }, `{ id password }`)

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

  async vote(root, args, context, info) {
    const userId = getUserId(context)

    const q = {
      user: { id: userId },
      link: { id: args.linkId },
    }

    const linkExists = await context
      .db
      .exists
      .Vote(q)

    if (linkExists) {
      throw new Error(`Already voted for link ${args.linkId}`)
    }

    const data = {
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } },
    }

    return context
      .db
      .mutation
      .createVote({ data }, info)
  }
}


