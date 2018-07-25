module.exports = {
  feed(root, { filter, skip, first }, context, info) {
    const clause = { OR: [{ url_contains: filter }, { description_contains: filter }] }
    const where = filter ? clause : {}

    return context.db.query.links({ where, skip, first }, info)
  }
}
