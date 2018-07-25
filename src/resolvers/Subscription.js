module.exports = {
  newLink: {
    subscribe(root, args, context, info) {
      const m = { where: { mutation_in: ['CREATED'] } }

      return context
        .db
        .subscription
        .link(m, info)
    }
  },
  newVote: {
    subscribe(root, args, context, info) {
      const ql = { where: { mutation_in: ['CREATED'] } }
      return context
        .db
        .subscription
        .vote(ql, info)
    }
  },
}

