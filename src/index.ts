import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Metas } from "./typeorm/entity/Metas";
import { Passwords } from "./typeorm/entity/Passwords";
import { Speeds } from "./typeorm/entity/Speeds";
import { Words } from "./typeorm/entity/Words";
import context from "./graphql/authentication";
import { TEAMS } from "./graphql/consts";
import defaultValues from "./typeorm/defaultValues";

(async () => {
  // DB연결
  await createConnection({
    type: "mysql",
    host: "localhost",
    username: process.env.NODE_ENV == 'production' ? process.env.LIVE_DB_USER : process.env.DEV_DB_USER,
    password: process.env.NODE_ENV == 'production' ? process.env.LIVE_DB_PASS : process.env.DEV_DB_PASS,
    database: `${process.env.DB_NAME}${process.env.GROUP}`,
    synchronize: false,
    logging: true,
    entities: [Metas, Passwords, Speeds, Words]
  });

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.NODE_PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.NODE_PORT}${server.graphqlPath}`);
  });
})();