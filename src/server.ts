import "reflect-metadata";

import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import fs from "fs";
import { applyMiddleware } from "graphql-middleware";
import { and, or, rule, shield } from "graphql-shield";
import jwt from "jsonwebtoken";
import path from "path";
import { createConnection } from "typeorm";

import { User } from "./entity/User";
import { Permission } from "./generated/graphql";
import resolvers from "./resolvers";

export interface Context {
  req: Request;
  res: Response;
}

const app = express();
const PORT = process.env.PORT || 4444;

app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);

app.use(cookieParser());
app.use((req, _, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as any;
    req.userId = userId;
  }
  next();
});

app.use(async (req, _, next) => {
  if (!req.userId) {
    return next();
  }

  const user = await User.findOne({ where: { id: req.userId } });

  req.user = user;
  next();
});

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, "schema.graphql"), {
    encoding: "utf8",
  })
);

(async () => {
  await createConnection();

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const isAuthenticated = rule({ cache: "contextual" })(
    (_: ParentNode, __: any, { req }: Context) => {
      return req.user !== null || req.user !== undefined;
    }
  );

  const isAdmin = rule({ cache: "contextual" })(
    (_: ParentNode, __: any, { req }: Context) => {
      return req.user.permissions.includes(Permission.Admin);
    }
  );

  const isPermissionUpdate = rule({ cache: "contextual" })(
    (_: ParentNode, __: any, { req }: Context) => {
      return req.user.permissions.includes(Permission.Premissionupdate);
    }
  );

  const permissions = shield({
    Query: {
      users: and(isAuthenticated, or(isAdmin, isPermissionUpdate)),
    },
  });

  const withMiddleware = applyMiddleware(schema, permissions);

  const server = new ApolloServer({
    schema: withMiddleware,
    playground: true,
    context({ req, res }: Context): Context {
      return {
        req,
        res,
      };
    },
  });

  server.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port http://localhost:4444`);
  });
})();
