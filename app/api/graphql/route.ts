// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { Resolvers } from "@/src/generated/resolver-types";
import { createSchema, createYoga } from "graphql-yoga";
import { readFileSync } from "node:fs";
import path from "path";

console.log("type");

const jsonDirectory = path.join(process.cwd(), "src");
const typeDefs = readFileSync(jsonDirectory + "/schema.graphql", "utf8");

const resolver: Resolvers = {};

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: resolver,
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
