import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import morgan from "morgan";
import schema from "./schema";
import resolvers from "./resolvers";

const app = express();
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));

const dataSources = () => {
  return {};
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (error) => error,
  dataSources,
  context: (params) => () => {
    console.log("query---", params.req.body.query);
    // console.log(params.req.body.variables);
  },
  //   introspection: true,
  playground: false,
});

app.use(morgan("combined"));

server.applyMiddleware({ app, path: "/graphql" });

app.use(bodyParser.json());

app.post("/api/error", (req, res) => {
  console.log("error", req.body);
  res.json({ status: "ok" });
});

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
