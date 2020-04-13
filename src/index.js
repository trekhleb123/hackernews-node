const { GraphQLServer } = require("graphql-yoga")
const _find = require("lodash/find")
//dummy data for links
// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ]

let idCount = links.length

//actual implementation of the GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, arg) => {
      return _find(links, { id: arg.id })
    }
  },
  // Link: {
  //   //parent (or sometimes root or obj) is the result of the previous resolver execution level.
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    updateLink: (parent, arg) => {
      const link = _find(links, { id: arg.id })
      link.url = arg.url
      link.description = arg.description
      return link
    },
    deleteLink: (parent, arg) => {
      const deletedLink = _find(links, { id: arg.id })
      links = links.filter(link => link.id !== arg.id)
      return deletedLink
    }
  }
}
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
