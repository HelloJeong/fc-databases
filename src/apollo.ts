import { ApolloServer, gql } from "apollo-server";
import { IResolvers } from "@graphql-tools/utils";
import { sequelize, User, City } from "./apollo-sq";

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    age: Int!
    city: City
  }

  type City {
    id: Int!
    name: String!
    users: [User]
  }

  type Query {
    users: [User]
  }
`;
// ! => required

const resolvers: IResolvers = {
  Query: {
    users: async () => User.findAll(),
  },

  User: {
    city: async (user) =>
      City.findOne({
        where: {
          id: user.cityId,
        },
      }),
  },

  City: {
    users: async (city) =>
      User.findAll({
        where: {
          cityId: city.id,
        },
      }),
  },
};

async function makeDummy() {
  // Dummy Data
  const seoul = await City.build({
    name: "Seoul",
  }).save();

  await User.build({
    age: 20,
    name: "Coco",
    cityId: seoul.getDataValue("id"),
  }).save();

  await User.build({
    age: 30,
    name: "jeong",
    cityId: seoul.getDataValue("id"),
  }).save();
}

async function main() {
  await sequelize.sync({ force: true });

  await makeDummy();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen(5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
