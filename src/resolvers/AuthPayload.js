module.exports = {
  user(root, args, context, info) {
    const q = { where: { id: root.user.id } }
    return context
      .db
      .query
      .user(q, info)
  },
}