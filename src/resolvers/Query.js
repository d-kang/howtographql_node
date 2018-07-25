module.exports = {
  feed(root, args, context, info) {
    if (args.filter) {
      const where = { OR: [{ url_contains: args.filter }, { description_contains: args.filter } ] }
      return context.db.query.links({ where }, info)
    }
    return context.db.query.links({}, info)
  }
}
