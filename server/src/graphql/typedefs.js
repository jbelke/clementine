const { ApolloServer, gql } = require('apollo-server-express')

module.exports = gql`
  scalar JSON
  scalar DateTime

  type User {
    id: ID!
    email: String!
    graphs: [Graph]
  }

  type Graph {
    id: ID!
    name: String!
    user: User
    keys: [Key]!
    operations: [Operation]!
  }

  type Key {
    id: ID!
    secret: String!
    graph: Graph!
  }

  type Operation {
    id: String!
    count: Int!
    duration: Float!
  }

  type Trace {
    id: ID!
    "Operation Key"
    key: String!
    duration: Float!
    startTime: DateTime!
    endTime: DateTime!
    execution: JSON!
    validation: JSON!
    parsing: JSON!
  }

  type Query {
    user: User
    graph(graphId: ID!): Graph
    traces(graphId: ID!): [Trace]
    operations(graphId: ID!): [Operation]
  }

  type Mutation {
    graphCreate(name: String!): Graph!
    keyCreate(graphId: ID!): Key!
    userLogout: Boolean!
    userCreate(email: String, password: String): User!
    userLogin(email: String, password: String): User!
  }
`
