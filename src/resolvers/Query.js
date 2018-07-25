module.exports = {
  feed(root, args, context, info) {
    // console.log('root: ', root);
    // console.log('args: ', args);
    // console.log('context: ', context);
    // console.log('info: ', info);
    return context.db.query.links({}, info)
  }
}
