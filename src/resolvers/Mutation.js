const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const getUserId = require('../utils')

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
    // const promis = context
    //   .db
    //   .mutation
    //   .createLink({ data: { ...args } }, info)

    // console.log('promis: ', promis);
    // return promis



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

    const token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { token, user }
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

    const valid = await bcrypt
      .compare(args.password, user.password)

    if (!valid) {
      throw new Error('Invalid Password')
    }

    const token = jwt
      .sign({ userId: user.id }, APP_SECRET)

    return { token, user }
  },

}


