"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipe_controller_1 = __importDefault(require("./controllers/recipe.controller"));
const category_controller_1 = __importDefault(require("./controllers/category.controller"));
const article_controller_1 = __importDefault(require("./controllers/article.controller"));
const tag_controller_1 = __importDefault(require("./controllers/tag.controller"));
const app = (0, express_1.default)(), port = 3000, bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express_1.default.static(process.cwd() + "/TasteFE/dist/taste-fe/browser"));
app.use("/api/recipe", recipe_controller_1.default);
app.use("/api/category", category_controller_1.default);
app.use("/api/article", article_controller_1.default);
app.use("/api/tag", tag_controller_1.default);
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/TasteFE/dist/taste-fe/browser/index.html");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map