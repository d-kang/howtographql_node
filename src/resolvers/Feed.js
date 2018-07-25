module.exports = {
  links(root, args, context, info) {
    console.log('links resolver ran')
    console.log('root.linksIds: ', root.linksIds);

    const where = { id_in: root.linksIds }
    return context
      .db
      .query
      .links({ where }, info)
  }
}


function links(parent, args, context, info) {
  return context.db.query.links({ where: { id_in: parent.linkIds } }, info)
}

module.exports = {
  links,
}