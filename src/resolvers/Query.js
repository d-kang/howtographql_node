module.exports = {
  feed(root, args, context, info) {
    console.log('args.linkId: ', args.linkId);
    if (args.linkId) {

      const ql = { where: { id: args.linkId } }
      return context.db.query.links(ql, info)
    }
    return context.db.query.links({}, info)
  }
}
