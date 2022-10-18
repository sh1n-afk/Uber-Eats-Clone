const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = graphql;
const RestaurantService = require("../restaurant/RestaurantService");

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    addressType: { type: GraphQLString },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    country: { type: GraphQLString },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    zipCode: { type: GraphQLString },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    customer_id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    //   date_of_birth: Date,
    customer_image: { type: GraphQLString },
    addresses: {
      type: new GraphQLList(AddressType),
    },
    favourites: { type: new GraphQLList(GraphQLString) },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    restaurant_id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    //   open_time: Date,
    //   close_time: Date,
    restaurant_image: { type: GraphQLString },
    location: { type: AddressType },
  }),
});

const CountryType = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    country_id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const OrderItemType = new GraphQLObjectType({
  name: "OrderItem",
  fields: () => ({
    itemId: { type: GraphQLString },
    itemPrice: { type: GraphQLFloat },
    restaurantId: { type: GraphQLString },
    qty: { type: GraphQLFloat },
    specialInstruction: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    order_id: { type: GraphQLString },
    restaurant_id: { type: GraphQLString },
    customer_id: { type: GraphQLString },
    order_mode: { type: GraphQLString },
    order_status: { type: GraphQLString },
    items: { type: new GraphQLList(OrderItemType) },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getRestaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const res = await RestaurantService.getRestaurantInfo(args.id);
        return res.restaurant;
      },
    },
  },
});

module.exports = {
  rootQuery,
  CustomerType,
  AddressType,
  RestaurantType,
  CountryType,
  OrderType
};
// const
