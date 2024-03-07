import express from "express";
import recipe from "./controllers/recipe.controller";
import category from "./controllers/category.controller";
import article from "./controllers/article.controller";
import tag from "./controllers/tag.controller";

const app = express(),
  port = 8080,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/TasteFE/dist/taste-fe/browser"));

app.use("/api/recipe", recipe);
app.use("/api/category", category);
app.use("/api/article", article);
app.use("/api/tag", tag);

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/TasteFE/dist/taste-fe/browser/index.html");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
