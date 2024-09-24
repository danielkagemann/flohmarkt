import express from "express";
import ViteExpress from "vite-express";
import {$Articles, ArticleModel} from "./Articles.js";

const app = express();

app.get("/v1/list",async (_, res) => {

  const results: ArticleModel[] = [];
  await $Articles.read($Articles._URL, results);

  res.status(200).json(results);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
