const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const { rootQuery } = require("./schemas");
const mutation = require("./mutations");

const schema = new GraphQLSchema({ query: rootQuery, mutation: mutation });

module.exports = schema;
