"use strict"
const feed = (root, arg, context, info) => {
  context.prisma.links()
}

module.exports = {
  feed
}
