module.exports = {
  async feed(root, { filter, skip, first, orderBy }, context, info) {
    const clause = {
      OR: [
        { url_contains: filter },
        { description_contains: filter },
      ]
    }
    const where = filter ? clause : {}


    const queriedLinks = await context
      .db
      .query
      .links({ where, skip, first, orderBy }, `{ id }`)

    const countSelectionSet = `
      {
        aggregate {
          count
        }
      }
    `

    const linksConnection = await context
      .db
      .query
      .linksConnection({}, countSelectionSet)

    return {
      count: linksConnection.aggregate.count,
      linkIds: queriedLinks.map(link => link.id),
    }
  }
}
