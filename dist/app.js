"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipe_controller_1 = __importDefault(require("./controllers/recipe.controller"));
const category_controller_1 = __importDefault(require("./controllers/category.controller"));
const app = (0, express_1.default)();
const port = 3000;
app.use("/api/recipe", recipe_controller_1.default);
app.use("/api/category", category_controller_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
