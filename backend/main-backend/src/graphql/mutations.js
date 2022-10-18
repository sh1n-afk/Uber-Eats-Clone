const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const AuthService = require("../auth/AuthService");
const { CustomerType } = require("./schemas");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCustomer: {
      type: CustomerType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        await AuthService.registerCustomer(
          args.email,
          args.password,
          args.name
        );
        return { message: "Customer Added Successfully" };
      },
    },
  },
});

module.exports = mutation;