const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, APP_SECRET } = require('../utils')

module.exports = {
  post(root, { url, description }, context, info) {
    const userId = getUserId(context)
    const data = {
      url,
      description,
      postedBy: { connect: {id: userId } },
    }

    return context
      .db
      .mutation
      .createLink({ data }, info)
  },
  async signup(root, { name, email, password, }, context, info) {
    const hashedPassword = await bcrypt
      .hash(password, 10)


    const data = { data: { name, email, password: hashedPassword } }
    const user = await context
      .db
      .mutation
      .createUser({ data }, `{ id }`)

    const Token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { Token, user }
  },

  async login(root, { email, password }, context, info) {
    const where = { email }
    const user = await context
      .db
      .query
      .user({ where }, `{ id password }`)

    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt
      .compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid Password!')
    }

    const Token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { Token, user }
  },

  async vote(root, { linkId }, context, info) {
    const userId = getUserId(context)

    const q = {
      user: { id: userId },
      link: { id: linkId },
    }

    const linkExists = await context
      .db
      .exists
      .Vote(q)

    if (linkExists) {
      throw new Error(`Already voted for link ${linkId}`)
    }

    const data = {
      user: { connect: { id: userId } },
      link: { connect: { id: linkId } },
    }

    return context
      .db
      .mutation
      .createVote({ data }, info)
  }
}


