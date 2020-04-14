"use strict"
const { GraphQLServer } = require("graphql-yoga")
const { prisma } = require("./generated/prisma-client")
const _find = require("lodash/find")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const User = require("./resolvers/User")
const Link = require("./resolvers/Link")
const Subscription = require("./resolvers/Subscription")
const Vote = require("./resolvers/Vote")

//dummy data for links
// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ]

//let idCount = links.length

//actual implementation of the GraphQL schema
const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote
  // Query: {
  //   info: () => `This is the API of a Hackernews Clone`

  // link: (parent, arg) => {
  //   return _find(links, { id: arg.id })
  // }
  // },
  // Link: {
  //   //parent (or sometimes root or obj) is the result of the previous resolver execution level.
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // },
  //Mutation: {}
  // updateLink: (parent, arg) => {
  //   const link = _find(links, { id: arg.id })
  //   link.url = arg.url
  //   link.description = arg.description
  //   return link
  // },
  // deleteLink: (parent, arg) => {
  //   const deletedLink = _find(links, { id: arg.id })
  //   links = links.filter(link => link.id !== arg.id)
  //   return deletedLink
  // }
  //}
}
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return { ...request, prisma }
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
