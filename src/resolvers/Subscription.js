module.exports = {
  newLink: {
    subscribe(root, args, context, info) {
      const m = { where: { mutation_in: ['CREATED'] } }

      return context
        .db
        .subscription
        .link(m, info)
    }
  }
}

